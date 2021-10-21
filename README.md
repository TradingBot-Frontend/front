<!-- @format -->

# TradingBot Frontend 프로젝트입니다!

## TradingBot?

-   이동평균선을 기준으로 조건을 설정하여 암호화폐를 자동으로 매매해주는 서비스입니다.

## 사용 기술

-   React, Redux, Redux-Saga, TypeScript, Materail-UI, Swagger, Websocket, styled-compoents, ...

## 역할

-   총 인원: 3명
    -   Front1: 로그인, 회원가입, 트레이딩봇 UI 개발 담당
        -   JWT 기반 인증인가 프론트 처리 및 로그인 페이지 UI 개발
        -   트레이딩봇 조회, 생성, 수정, 삭제 기능 개발
        -   카드 UI에 반응형 웹 적용
        -   eslint, prettier, alias, redux devtools, 디렉토리 구조 등 프로젝트 셋업
    -   Front2: 대시보드, 실시간 코인 시세 조회 UI 개발
        -   Websocket으로 실시간 데이터 조회 및 처리
        -   유저 정보 수정 다이얼로그 UI 개발
        -   대시보드 UI 개발
        -   디자인 기획
        -   Storybook으로 컴포넌트 기반 Test tool 설정
    -   Front3: 포트폴리오 UI 개발
        -   도넛 차트 UI 개발
        -   거래 내역 UI 개발

![dashboard](https://user-images.githubusercontent.com/58619104/137162666-7c3555e8-fb15-448b-9b7c-c4525a3402ac.png)
![coin](https://user-images.githubusercontent.com/58619104/137162677-56a72ff0-e658-4682-97b5-535f93897f1c.png)
![tradingbots](https://user-images.githubusercontent.com/58619104/137162686-a50474ce-ee62-4942-8bff-c784e6e02b10.png)
![addBot](https://user-images.githubusercontent.com/58619104/137162698-b234fea5-433a-4f36-a447-e8da4f5b301a.png)
![portfolio](https://user-images.githubusercontent.com/58619104/137162724-591a0af2-413b-4a09-9cff-5db27acf3036.png)

## Websocket 구조

```
├─redux
│  │  README.md
│  ├─reducers
│  │      authReducer.ts
│  │      botReducer.ts
│  │      coinReducer.ts
│  │      potfolioReducer.ts
│  │      websocketReducer.ts
│  │      index.ts
│  └ ─images
│  │      authSaga.ts
│  │      botSaga.ts
│  │      coinSaga.ts
│  │      portfolioSaga.ts
│  │      websocketSaga.ts
│  │      index.ts
   └ ─stores
```

-   DsbCoinListContainer.tsx에서 websocket의 startInit() 함수를 부른다

```
useEffect(() => {
    dispatch(fetchCoinActions.request());
    dispatch(startInit());
  }, []);
```

-   websocketSaga.ts에서 START_INIT을 dispath하여 wsSaga를 시작한다

```
export function* wsSaga(): any {
  yield connectSocketSaga({ payload: 'coinList' });
}
export function* watchLivePricesSaga() {
  yield takeEvery(START_INIT, wsSaga);
  yield takeEvery(FETCH_COIN_REQUEST, fetchCoin);
}
```

-   createConnectSocketSaga 함수

    -   connectSocket에서 const client = yield call(createSocket);을 통해 websocket 연결 이때 전역 변수로 선언한 wsConnection에 websocket 객체를 넣어둠

    -   eventChannel 팩토리 사용해 websocket 이벤트에 연결
    -   외부 이벤트 소스를 초기화 하고 제공된 emitter를 실행하여 소스에서 체널로 들어오는 모든 이벤트를 라우팅

    ```
       const connectSocket = (socket: any, action: any, buffer: any) => {
    return eventChannel((emit) => {
    socket.open = () => {
       // console.log('connect websocket')
    };
    socket.onmessage = (event: any) => {
       // const arr = new Uint8Array(evt.data);
       const data = JSON.parse(event.data);
       // console.log('socket onmessage: ', data);
       emit(data);
    };
    socket.onerror = (error: any) => {
       console.dir(error);
    };
    const unsubscribe = () => {
       socket.close();
    };

    return unsubscribe;
    }, buffer || buffer.none());
    };

    ```

-   yield flush(clientChannel)를 이용해 실시간으로 들어오는 websocket 데이터를 바로바로 렌더링하지 않고 버퍼에 200초씩 모아뒀다가 뿌린다.


    ````
        while (true) {
       // 약 200ms동안 메세지 모으는중...
       const datas = yield flush(clientChannel);
       const state = yield select();
       const res = take(END_INIT);

       if (datas.length) {
         // 이 문구 없으면 메시지를 받았든 받지 않았든 200ms 마다 항상 dispatch 작업을 해서 혼란 야기할 수 도 있음
         // newCoinList: 기존값 data: 새로 들어온 값
         let newCoinList: any = [...state.coin.coinList];
         let changeFlag = '0';
         const flagMap: any = {
           currentPrice: `currentPrice`,
           money: `money`,
         };
         newCoinList = newCoinList.map((data: any) => {
           return {
             ...data,
             color: 'false',
           };
         });
         datas.forEach((data: ICoinState) => {
           const symbol: string = data.symbol as string;
           // if (state.coin.coinList[symbol]) {
           const targetIdx = newCoinList.findIndex(
             (coin: any) => coin.symbol === symbol,
           );
           if (targetIdx !== -1) {
             // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
             if (
               newCoinList[targetIdx].closePrice !==
               `${parseInt(data.closePrice, 10).toLocaleString()}원`
             ) {
               changeFlag = 'currentPrice';
             } else if (
               newCoinList[targetIdx].money !==
               `${parseInt(data.value, 10).toLocaleString()}원`
             ) {
               changeFlag = 'money';
             }
             if (
               newCoinList[targetIdx].timeTag.split('T')[1] <
               data.timeTag.split('T')[1]
             ) {
               newCoinList[targetIdx] = data;
               newCoinList[targetIdx].color = 'true';
               newCoinList[targetIdx].changeCell = flagMap[changeFlag];
             }
           } else {
             // 새로운 데이터면 그냥 넣음
             newCoinList.push(data);
           }
         });
         yield put({ type: SUCCESS, payload: newCoinList });
         // yield put({ type: SUCCESS, payload: dataMapper(sortedData, state) });
       }
       yield delay(500); // 500ms 동안 대기
     ```

    ````

    ```

    ```

-   로그아웃하면 웹소켓 끊기도록 로그아웃 핸들링에 dispatch(endInit()); 부른다.
-   websocketSaga.ts createConnectSocketSaga 함수에서 take(END_INIT)를 pulling함
-   wsEndSaga 함수가 실행되면서 웹소켓이 끊김

```
   export function* wsEndSaga(): any {
   const clientChannel = yield call(
      connectSocket,
      wsConnection,
      '',
      buffers.expanding(500),
   );
   clientChannel.unsubscribe();
   }
```

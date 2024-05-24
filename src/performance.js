import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getKeyMapModeList, beginKeyMapEditState, changeEditKeyMapSolution, getKeyMapInputType, getKeyMapSolutoinList } from './service'
import { keyMap, Window, Application } from '@tencent/yyb-client-web-jsbridge';

const defaultData = {
  loginType: '',
  openId: '',
  accessToken: '',
  refreshToken: '',
}
function App() {
  const hasInit = useRef(false)
  const [pkgName, setPkgName] = useState('com.tencent.letsgo')
  const [inputType, setInputType] = useState(0)
  const [modeId, setModeId] = useState(-1)
  const [solutionId, setSolutionId] = useState("");
  const [userInfo, setUserInfo] = useState({ ...defaultData, openId: '-1' })
  const [solutionList, setSolutionList] = useState([])
  const modeIdRef = useRef(modeId)
  const inputTypeRef = useRef(inputType)
  const userIdRef = useRef(userInfo.openId)
  const pkgNameRef = useRef(pkgName)
  const [modeList, setModeList] = useState([])
  modeIdRef.current = modeId
  pkgNameRef.current = pkgName;
  inputTypeRef.current = inputType
  userIdRef.current = userInfo.openId;
  useEffect(() => {
    setTimeout(() => {
      Window.Broadcast("", JSON.stringify({
        eventName: 'yybClientLoginWebviewOpen', data: {
          fromWinId: 'sidebar_keymap_com.tencent.letsgo'
        }
      }))
    }, 50);
    const listener = async (data) => {
      console.log('广播过来的事件', data);
      if (data.eventName === "yybClientOnLogout") {
        await Application.handler.SetLoginParam(JSON.stringify(defaultData))
        setUserInfo(defaultData)
      } else if (data.eventName === "yybClientLoginLoginToWatcher" || data.eventName === "yybClientLoginUpdateUserInfo") {
        await Application.handler.SetLoginParam(JSON.stringify(data.data.userInfo))
        setUserInfo(data.data.userInfo)
      }

    };
    Window.addListener('AddBroadcastListener', listener);

    return () => {
      Window.removeListener('AddBroadcastListener', listener);
    };
  }, [])
  useEffect(() => {
    if (userInfo.openId === '-1') return;
    const getInputType = async () => {
      const res = await getKeyMapInputType({
        pkgName, userId: userInfo.openId
      })
      setInputType(res.inputType)

    }
    getInputType()
  }, [pkgName, userInfo.openId]);
  useEffect(() => {
    if (!inputType || userInfo.openId === '-1') return;
    const getModeList = async () => {
      const res = await getKeyMapModeList({
        userId: userInfo?.openId || '', inputType, pkgName
      })

      if (res) {
        setModeId(res.activeModeId)
        setModeList(res.keyMapModeList)
      }

    }
    getModeList();
  }, [inputType, pkgName, userInfo?.openId])
  console.log('inputytpe...', solutionId, solutionList)

  useEffect(() => {
    if (modeId === -1) return;
    const getSolutionList = async () => {
      const res = await getKeyMapSolutoinList({
        inputType: inputTypeRef.current,
        userId: userIdRef.current,
        modeId: modeId,
        pkgName: pkgNameRef.current,
      })
      setSolutionList(res.keyMapSolutionList)
      setSolutionId(res.activeSolutionId)
      const item = res.keyMapSolutionList.filter((km) => km.solutionId === res.activeSolutionId)[0];

      changeEditKeyMapSolution({
        userId: userIdRef.current,
        modeId,
        pkgName: pkgNameRef.current,
        solutionId: res.activeSolutionId,
        solutionSource: item.solutionSource,
      })
    }

    getSolutionList();
  }, [modeId])

  useEffect(() => {
    if (!solutionId || hasInit.current) return;
    hasInit.current = true;
    beginKeyMapEditState({
      guidanceArea: [9.890625, 139.28125, 59.40625, 61.875],
      modeId: modeIdRef.current,
      pkgName: pkgNameRef.current,
      solutionId: solutionId,
      userId: userIdRef.current,
    })

  }, [solutionId])


  useEffect(() => {
    if (!pkgName) return;
    keyMap.handler.GetKeyMapAuxSetting(JSON.stringify({
      pkgName
    })).then((res) => {
      if (!res) return;
      console.log('res..', res)
    });

    keyMap.handler.SetKeyMapCanvasBackground(JSON.stringify({
      show: false
    }))
  }, [pkgName])


  const activeMode = modeList.filter(m => m.modeId === modeId)[0] || {}
  const activeSolution = solutionList.filter(so => so.solutionId === solutionId)[0] || {}
  return (
    <div className="App">
      <div className='__debug__'></div>
      <div>登录状态：{userIdRef.current === '-1' || !userIdRef.current ? '未登录' : '已登录'}</div>
      <div>模式：{activeMode.modeName}</div>
      <div>方案：{activeSolution.solutionName}</div>
      <div></div>
    </div>
  );
}

export default App;

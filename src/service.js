import { keyMap, Window, Application } from '@tencent/yyb-client-web-jsbridge';

// 获取模式列表
export const getKeyMapModeList = async (args) => {
    const startTime = Date.now();
    console.log(`getKeyMapModeList调用参数：`, startTime, args);
    const res = await keyMap.handler.GetKeyMapModeList(JSON.stringify(args));
    const consumedTime = Date.now() - startTime;
    console.log(`getKeyMapModeList调用结果：`, consumedTime, res);
    let data = {
        keyMapModeList: [],
        activeModeId: -1,
    };
    if (res && res.code === 0 && res.data !== 'null') {
        try {
            data = JSON.parse(res.data);
        } catch (e) {
            console.error('JSON parse Error', e);
        }
    }
    console.log(`getKeyMapModeList调用结果解析后：`, data);

    return data;
};

// 获取当前是键鼠模式还是手柄模式
export const getKeyMapInputType = async (args) => {
    const startTime = Date.now();
    console.log(`getKeyMapInputType调用参数：`, startTime, args);
    const res = await keyMap.handler.GetKeyMapInputType(JSON.stringify(args));
    const consumedTime = Date.now() - startTime;
    console.log(`getKeyMapInputType调用结果：`, consumedTime, res);
    let data = {
        inputType: 1,
    };
    if (res && res.code === 0 && res.data !== 'null') {
        try {
            data = JSON.parse(res.data);
        } catch (e) {
            console.error('JSON parse Error', e);
        }
    }

    return data;
};


// 根据模式ID获取方案列表
export const getKeyMapSolutoinList = async (args) => {

    const startTime = Date.now();
    console.log(`getKeyMapSolutoinList调用参数：`, startTime, args);
    const res = await keyMap.handler.GetKeyMapSolutoinList(JSON.stringify(args));
    const consumedTime = Date.now() - startTime;
    console.log(`getKeyMapSolutoinList调用结果：`, consumedTime, res);
    let data = {
        keyMapSolutionList: [],
        activeSolutionId: '',
    };
    console.log('获取方案列表...', res);
    if (res && res.code === 0 && res.data !== 'null') {
        try {
            data = JSON.parse(res.data);
        } catch (e) {
            console.error('JSON parse Error', e);
        }
    }
    console.log(`getKeyMapSolutoinList调用结果解析后：`, data);

    return data;
};

// 键位编辑页：切换方案
export const changeEditKeyMapSolution = async (args) => {

    const startTime = Date.now();
    console.log(`ChangeEditKeyMapSolution调用参数：`, startTime, args);
    const res = await keyMap.handler.ChangeEditKeyMapSolution(JSON.stringify(args));
    const consumedTime = Date.now() - startTime;
    console.log(`ChangeEditKeyMapSolution调用结果：`, consumedTime, res);


    return res;
};


// 通知客户端进入编辑态
export const beginKeyMapEditState = async (args) => {
    const startTime = Date.now();
    console.log(`beginKeyMapEditState调用参数：`, startTime, args);
    const res = await keyMap.handler.BeginKeyMapEditState(JSON.stringify(args));
    const consumedTime = Date.now() - startTime;
    console.log(`beginKeyMapEditState调用结果：`, consumedTime, res);


    return res;
};
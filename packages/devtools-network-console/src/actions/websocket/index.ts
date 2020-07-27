// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ms } from 'network-console-shared';
import { ThunkAction } from 'redux-thunk';
import { IView } from 'store';
import { AnyAction } from 'redux';
import { WebSocketMock } from 'host/web-application-host';

export interface ISendWebsocketMessageAction {
    type: 'REQUEST_WEBSOCKET_SEND_MESSAGE';

    requestId: string;
    messageBody: string;
}

export type WSMsgDirection = 'send' | 'recv';

export interface IWebsocketMessageLoggedAction {
    type: 'REQUEST_WEBSOCKET_MESSAGE_LOGGED';

    requestId: string;
    direction: WSMsgDirection;
    time: ms;
    content: string;
}

export interface IWebsocketDisconnectedAction {
    type: 'REQUEST_WEBSOCKET_DISCONNECTED';

    requestId: string;
}

export function makeSendWebsocketMessageAction(requestId: string, messageBody: string): ISendWebsocketMessageAction {
    return {
        type: 'REQUEST_WEBSOCKET_SEND_MESSAGE',
        requestId,
        messageBody,
    };
}

export function makeWebsocketMessageLoggedAction(requestId: string, direction: WSMsgDirection, time: ms, content: string): IWebsocketMessageLoggedAction {
    return {
        type: 'REQUEST_WEBSOCKET_MESSAGE_LOGGED',
        requestId,
        direction,
        time,
        content,
    };
}

export function makeWebSocketDisconnectedAction(requestId: string): IWebsocketDisconnectedAction {
    return {
        type: 'REQUEST_WEBSOCKET_DISCONNECTED',
        requestId
    }
}

export function sendWsMessage(requestId: string, messageBody: string): ThunkAction<void, IView, void, AnyAction> {
    return async dispatch => {
        dispatch(makeSendWebsocketMessageAction(requestId, messageBody));
        WebSocketMock.instance(requestId).send(messageBody);
    };
}

export function sendWsDisconnect(requestId: string): ThunkAction<void, IView, void, AnyAction> {
    return async dispatch => {
        dispatch(makeWebSocketDisconnectedAction(requestId));
    };
}

import React, { useState, useEffect } from 'react';
import './App.css';
import call from './service';
import { initSocket, getSocket } from './socket'

let socket;
if (!socket) {
  initSocket().then((socketObj) => {
    socket = socketObj
  });
}

function App() {
  let socket = getSocket();
  socket.on('refreshChat', (timestamp) => {
    setRefresh(timestamp);
  });

  const [data, setData] = useState();
  const [state, setState] = useState();
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    call('get', 'getMessage').then((result) => {
      setState(result);
    }).catch((e) => {
      console.log("Error in getMessage API:", e);
    });
  }, [refresh]);

  function sendMessageFunc(e) {
    e.preventDefault();
    document.getElementById('chatBoxInput').value = '';
    call('post', 'sendMessage', { message: data, userId: 'usr007', date: new Date() }).then((result) => {
    }).catch((e) => {
      console.log("Error in sendMessage API:", e);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-body">
          <div className="instructions">
            <p><u>Instructions to start chat with Bot</u></p>
            User: Hello <br />
            Bot: How are you doing ? How can I help you ?<br />
            User: I want to check my balance <br />
            Bot: You have R200. Anything else i can help with ? <br />
            User: No thanks <br />
            Bot: Awesome, Happy to assist goodbye. <br />
            </div>
          <div className="chat-content">
            <div className="border w-75">
              <div class="panel-body">
                <ul class="chat">
                  {state && state.length
                    ? state.map((chat) => {
                        return (
                          <>
                            {chat && chat.userId !== "bot007" ? (
                              <li class="right clearfix">
                                <span class="chat-img pull-right">
                                  <img
                                    src="http://placehold.it/50/FA6F57/fff&text=YOU"
                                    alt="User Avatar"
                                    class="img-circle rounded-circle m-2"
                                  />
                                </span>
                                <div class="chat-body clearfix">
                                  <div class="header pull-right">
                                    <p className="">{chat.message}</p>
                                    <small class="text-muted">
                                      <span class="glyphicon glyphicon-time"></span>
                                      {chat.date}
                                    </small>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              ""
                            )}

                            {chat && chat.userId === "bot007" ? (
                              <li class="left clearfix">
                                <span class="chat-img pull-left">
                                  <img
                                    src="http://placehold.it/50/55C1E7/fff&text=BOT"
                                    alt="User Avatar"
                                    class="img-circle rounded-circle m-2"
                                  />
                                </span>
                                <div class="chat-body clearfix">
                                  <div class="header pull-left">
                                    <p>{chat.message}</p>
                                    <small class="text-muted">
                                      <span class="glyphicon glyphicon-time"></span>
                                      {chat.date}
                                    </small>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })
                    : "No Chats Found !!"}
                </ul>
              </div>
              <div class="panel-footer">
                <div class="input-group rounded-0">
                  <input
                    type="text"
                    class="form-control input-sm rounded-0"
                    placeholder="Type your message here..."
                    onBlur={(event) => setData(event.target.value)}
                    id="chatBoxInput"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-success rounded-0"
                      onClick={(event) => sendMessageFunc(event)}
                    >
                      Send
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

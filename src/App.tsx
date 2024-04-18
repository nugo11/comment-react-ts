import { useState } from "react";
import "./App.css";
import img from "./imgs/Oval.png";
import arrow from "./imgs/Path.png";
import shape1 from "./imgs/Shape (1).png";
import shape2 from "./imgs/Shape.png";

function App() {
  const [addcom, setAddcom] = useState<string>("");
  const [updatcom, setupdatcom] = useState<string>("");
  const [comArr, setComarr] = useState<string[]>([]);
  const [counters, setCounters] = useState<number[]>([]);
  const [modal, setModal] = useState<number | null>(null);
  const [update, seteUpdate] = useState<number | null>(null);
  const [reply, setReply] = useState<number | null>(null);
  const [reply1, setReply1] = useState<number | null>(null);
  const [replycom, setReplycom] = useState<any>(null);

  const pushComs = () => {
    setComarr([...comArr, addcom]);
    setCounters([...counters, 0]);
    setAddcom("");
  };

  const handleCounterChange = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] += value;
    setCounters(newCounters);
  };

  const openModal = (indexi: number) => {
    setModal(indexi);
  };

  const deleteCom = (item: string) => {
    const delArr = comArr.filter((itemi) => itemi !== item);
    setComarr(delArr);
    setModal(null);
  };

  const updateCom = () => {
    const updatedArr = comArr.map((item, index) =>
      index === update ? updatcom : item
    );
    setComarr(updatedArr);
    setupdatcom("");
    seteUpdate(null);
  };

  const setR = (index: number) => {
    reply === null ? setReply(index) : setReply(null);
    reply1 === null ? setReply1(index) : setReply1(null);
  };

  return (
    <>
      <div className="coms">
        <div className="comsec">
          {comArr.map((item, index) => {
            return (
              <>
                <div className="addedcom" key={index}>
                  {modal === index && (
                    <div className="modal">
                      <div className="modalhead">
                        <h1>Delete comment</h1>
                        <p>
                          Are you sure you want to delete this comment? This
                          will remove the comment and can't be undone.
                        </p>
                        <ul>
                          <button id="gray" onClick={() => setModal(null)}>
                            NO, CANCEL
                          </button>
                          <button onClick={() => deleteCom(item)}>
                            YES, DELETE
                          </button>
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="comleft">
                    <button onClick={() => handleCounterChange(index, 1)}>
                      +
                    </button>
                    <p>{counters[index]}</p>
                    <button onClick={() => handleCounterChange(index, -1)}>
                      -
                    </button>
                  </div>
                  <div className="comright">
                    <div className="rightrl">
                      <div className="rightl">
                        <img src={img} alt="avatar" />
                        <span>
                          <b>juliusomo</b>
                        </span>
                        <span>04/17/2024</span>
                      </div>
                      <div className="rightr">
                        <img
                          src={shape2}
                          alt="del"
                          onClick={() => openModal(index)}
                        />
                        <img
                          src={shape1}
                          alt="edit"
                          onClick={() => seteUpdate(index)}
                        />
                        <img
                          src={arrow}
                          alt="reply"
                          onClick={() => setR(index)}
                        />
                        <span onClick={() => setR(index)}>Reply</span>
                      </div>
                    </div>
                    {update === index ? (
                      <>
                        <div className="editcom">
                          <input
                            value={updatcom}
                            onChange={(e) => setupdatcom(e.target.value)}
                          />
                          <button onClick={() => updateCom()}>Update</button>
                        </div>
                      </>
                    ) : (
                      <div className="message">{item}</div>
                    )}
                  </div>
                </div>
                {reply === index && (
                  <div className="reply">
                    <div className="addedcom" key={index}>
                      <div className="comright">
                        {reply1 === index && (
                          <div className="editcom">
                            <img src={img} alt="avatar" />
                            <input
                              value={replycom}
                              onChange={(e) => setReplycom(e.target.value)}
                            />
                            <button onClick={() => setReply1(null)}>
                              REPLY
                            </button>
                          </div>
                        )}
                        {replycom !== null && (
                          <>
                            <div className="replucom">
                              <img src={img} alt="avatar" width={20} />
                              <span>{replycom}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="addcom">
          <img src={img} alt="avatar" />
          <input
            type="text"
            placeholder="Add a comment…"
            value={addcom}
            onChange={(e) => setAddcom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pushComs()}
          />
          <button onClick={pushComs}>SEND</button>
        </div>
      </div>
    </>
  );
}

export default App;

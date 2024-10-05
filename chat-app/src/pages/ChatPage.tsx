import { FC, useEffect, useRef, useState } from "react";
import styles from "./ChatPage.module.css";
import PencilIcon from "../components/PencilIcon";
import axios from 'axios';
import Loader from "../components/Loader";

type TMessage = {
  role: string,
  content: string,
}

const endpoint = 'http://127.0.0.1:5000/api/send_prompt';

const ChatPage: FC = () => {
  const [initialState, setInitialState] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setInitialState(false);

    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);

    setUserInput('');

    try {
      const response = await axios.post(endpoint, {
        prompt: userInput,
      });

      const assistantMessage = { role: 'assistant', content: response.data.response };
      setIsLoading(false);
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending prompt:', error);
    }
  }

  return (
    <div className={styles.chatBot}>
      <header className={styles.topbar}>
        <div className={styles.button1}>
          <button type="button" className={styles.arrowLeft}>
            <img
              className={styles.arrowLeftIcon}
              loading="lazy"
              alt=""
              src="/heroiconsoutlinearrowleft.svg"
            />
          </button>
        </div>
        <div className={styles.pencilIconContainer}>
          <PencilIcon />
        </div>
        <div className={styles.closeContainer}>
          <span className={styles.exit}>Quitter</span>
          <div className={styles.button1}>
            <div className={styles.closeButton}>
              <img
                className={styles.heroiconsOutlinexMark}
                loading="lazy"
                alt=""
                src="/heroiconsoutlinexmark.svg"
              />
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.instanceParent}>
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.heroiconsOutlinecheckWrapper}>
                <img
                  className={styles.heroiconsOutlinecheck}
                  loading="lazy"
                  alt=""
                  src="/heroiconsoutlinecheck.svg"
                />
              </div>
              <b className={styles.votreSupport}>Votre support</b>
            </div>
            <div className={styles.divider}>
              <div className={styles.divider1} />
            </div>
            <div className={styles.frameContainer}>
              <div className={styles.heroiconsOutlinecheckWrapper}>
                <img
                  className={styles.heroiconsOutlinecheck}
                  loading="lazy"
                  alt=""
                  src="/heroiconsoutlinecheck.svg"
                />
              </div>
              <b className={styles.vosObjectifs}>Vos objectifs</b>
            </div>
            <div className={styles.divider}>
              <div className={styles.divider1} />
            </div>
            <div className={styles.frameDiv}>
              <div className={styles.wrapper}>
                <div className={styles.div}>3</div>
              </div>
              <div className={styles.votreContexte}>Vos objectifs</div>
            </div>
          </div>
          <div className={styles.rootParent}>
            <div className={styles.root}>
              <div className={styles.headerContainer}>
                <img className={styles.headerIcon} alt="" src="/vector.svg" />
                <h1
                  className={styles.chatHeader}
                >Discuter de votre situation</h1>
              </div>
              <div className={styles.container}>
                <div className={styles.chatContainer}>
                  {initialState && <div className={styles.placeholderContainer}>
                    <img
                      className={styles.placeholderPicture}
                      loading="lazy"
                      alt=""
                      src="/group-37.svg"
                    />
                    <div className={styles.infoMessageContainer}>

                      <p className={styles.infoMessage}>
                        Bienvenue sur ce Chatbot ! Si vous avez des questions ou besoin d'aide, n'hésitez pas à me le faire savoir. Je suis là pour
                        vous assister !
                      </p>
                    </div>
                  </div>}

                  <div className={styles.assistantMessage}>
                    <div className={styles.frameWrapper}>
                      <div className={styles.shapeWrapper}>
                        <div className={styles.avatarContainer}>
                          <img
                            className={styles.avatar}
                            alt=""
                            src="/chat-avatar.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.messageTextext}

                    >Décrivez votre situation</div>
                  </div>

                  {messages.map((message, index) => {
                    if (message.role === "assistant") {
                      return (<div key={index} className={styles.assistantMessage}>
                        <div className={styles.frameWrapper}>
                          <div className={styles.shapeWrapper}>
                            <div className={styles.avatarContainer}>
                              <img
                                className={styles.avatar}
                                alt=""
                                src="/chat-avatar.svg"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.messageTextext}

                        >{message.content}</div>
                      </div>)
                    }
                    return (
                      <div key={index} className={styles.userMessage}>
                        <div
                          className={styles.messageTextext}
                        >{message.content}</div>
                      </div>
                    )
                  })}

                  {isLoading && <Loader />}
                  <div ref={bottomRef} />
                </div>

                <form className={styles.inputForm} onSubmit={handleFormSubmit}>
                  <div className={styles.inputContainer}>
                    <input
                      className={styles.inputField}
                      value={userInput}
                      placeholder="Placeholder"
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                  <div className={styles.buttonContainer}>
                      <button type="submit" className={styles.sendButton}>Envoyer</button>
                  </div>
                </form>

                <div className={styles.secondButtonContainer}>
                  <div className={styles.secondButtonInnerContainer}>

                    <button type="button" className={styles.secondButton}>
                      Découvrir mon récapitulatif
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div className={styles.sidebar}>
                <img
                  className={styles.sidebarHeaderIcon}
                  loading="lazy"
                  alt=""
                  src="/frame-74940@2x.png"
                />
                <div className={styles.contentContainer}>
                  <div className={styles.assistantHeaderParent}>
                    <div className={styles.contentContainer}>
                      <div className={styles.votreAssistant}>
                        VOTRE ASSISTANT
                      </div>
                      <h2 className={styles.commentDiscuterAvec}>
                        Comment dialoguer avec l’IA ?
                      </h2>
                    </div>
                    <div className={styles.help}>
                      <div className={styles.helpButtonContainer}>
                        <img
                          className={styles.helpButtonContainerChild}
                          alt=""
                          src="/group-29.svg"
                        />
                      </div>
                      <img
                        className={styles.component2Icon}
                        alt=""
                        src="/component-2.svg"
                      />
                    </div>
                  </div>
                </div>
                <img
                  className={styles.groupIcon}
                  loading="lazy"
                  alt=""
                  src="/group.svg"
                />
              </div>

              <div className={styles.cardMembership}>
                <div className={styles.cardContainer}>
                  <div className={styles.frameParent6}>
                    <img
                      className={styles.instanceChild}
                      loading="lazy"
                      alt=""
                      src="/group-32-1.svg"
                    />
                  </div>
                  <div className={styles.cardBackground} />
                  <img
                    className={styles.intersectIcon}
                    alt=""
                    src="/intersect.svg"
                  />
                  <div className={styles.cardContent}>
                    <img
                      className={styles.cardContentChild}
                      alt=""
                      src="/group-32.svg"
                    />
                    <div className={styles.cardHeader} />

                  </div>
                  <div className={styles.progressInfo}>
                    <div className={styles.rocketContainer} />
                    <div className={styles.progressIndicatorBar}>
                      <div className={styles.track} />
                      <div className={styles.fill} />
                      <div className={styles.fill1} />
                      <div className={styles.fill2} />
                      <div className={styles.fill3} />
                      <div className={styles.fill4} />
                      <div className={styles.fill5} />
                    </div>
                    <div className={styles.label}>
                      Vous avez complété la première étape
                    </div>
                  </div>
                  <div className={styles.uneVraisFuseWrapper}>
                    <h2 className={styles.uneVraisFuse}>Une vraie fusée</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChatPage;

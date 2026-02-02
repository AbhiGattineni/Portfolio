import { useEffect, useRef, useState } from "react";

const Main = ({ refer, executeScroll, refs }) => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "I build things for the Web & Mobile.";
  const [showCursor, setShowCursor] = useState(true);
  const textRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Predefined questions
  const predefinedQuestions = [
    "What is Abhishek Gattineni's experience?",
    "What are his technical skills?",
    "Which companies has he worked at?",
    "Tell me about his projects",
    "What's his educational background?",
    "Is he available for freelance work?",
  ];

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    // Scroll the page to keep the scroll indicator visible at the bottom
    if ((messages.length > 0 || isTyping) && scrollIndicatorRef.current) {
      setTimeout(() => {
        scrollIndicatorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = async (question = null) => {
    const questionText = question || inputValue.trim();
    if (!questionText) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: questionText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowDropdown(false);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: questionText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuestionSelect = (question) => {
    setInputValue(question);
    setShowDropdown(false);
    // Optionally auto-send, or just fill the input
    // handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        position: "relative",
        overflow: "visible",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={refer}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-2",
        }}
      >
        <source src="main2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(10, 25, 47, 0.7), rgba(2, 12, 27, 0.7))",
          zIndex: "-1",
        }}
      ></div>
      
      {/* Floating particles effect */}
      <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: "0", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="animate-float"
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              backgroundColor: "#64ffda",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Hero Section - Compact at Top */}
      <div
        className="row justify-content-center text-center"
        style={{
          position: "relative",
          zIndex: "1",
          paddingTop: "6rem",
          paddingBottom: "1rem",
          minHeight: "auto",
        }}
      >
        <div className="container">
          <div className="col-12">
            <h6
              className="mb-3 animate-fade-in-down"
              style={{
                color: "#64ffda",
                fontSize: "1.1rem",
                fontWeight: "400",
                transition: "0.3s",
                animationDelay: "0.2s",
                opacity: 1,
              }}
            >
              Hi, my name is
            </h6>
            <h1
              className="mb-3 fw-bold animate-fade-in-up"
              style={{
                color: "#ccd6f6",
                fontSize: "4.5vmax",
                animationDelay: "0.4s",
              }}
            >
              Abhishek Gattineni.
            </h1>
            <h1
              ref={textRef}
              className="mb-4 fw-bold"
              style={{
                color: "#8892b0",
                fontSize: "3.5vmax",
                minHeight: "1.2em",
              }}
            >
              {displayedText}
              {showCursor && (
                <span
                  style={{
                    borderRight: "2px solid #64ffda",
                    animation: "blink 1s infinite",
                    marginLeft: "5px",
                  }}
                >
                  |
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>

      {/* Chat Interface - Center */}
      <div
        style={{
          position: "relative",
          zIndex: "1",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 1rem 2rem 1rem",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          minHeight: 0,
        }}
      >

        {/* Chat Messages Container */}
        {(messages.length > 0 || isTyping) && (
          <div
            ref={chatContainerRef}
            style={{
              width: "100%",
              maxHeight: "50vh",
              overflowY: "auto",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(10, 25, 47, 0.3)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(100, 255, 218, 0.1)",
              scrollBehavior: "smooth",
              position: "relative",
              flexShrink: 0,
            }}
          >
            {messages.length > 0 && (
              messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: "1.5rem",
                  display: "flex",
                  flexDirection: message.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      message.role === "user"
                        ? "rgba(100, 255, 218, 0.2)"
                        : "rgba(100, 255, 218, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid rgba(100, 255, 218, 0.3)",
                  }}
                >
                  <span style={{ color: "#64ffda", fontSize: "0.9rem" }}>
                    {message.role === "user" ? "👤" : "🤖"}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "0.875rem 1.125rem",
                    borderRadius: "18px",
                    backgroundColor:
                      message.role === "user"
                        ? "rgba(100, 255, 218, 0.15)"
                        : "rgba(255, 255, 255, 0.05)",
                    border:
                      message.role === "user"
                        ? "1px solid rgba(100, 255, 218, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    color: message.role === "user" ? "#64ffda" : "#ccd6f6",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    wordWrap: "break-word",
                    animation: "fadeInUp 0.3s ease-out",
                  }}
                >
                  {message.content}
                </div>
              </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(100, 255, 218, 0.3)",
                }}
              >
                <span style={{ color: "#64ffda", fontSize: "0.9rem" }}>🤖</span>
              </div>
              <div
                style={{
                  padding: "0.875rem 1.125rem",
                  borderRadius: "18px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#64ffda",
                      animation: "typingDots 1.4s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#64ffda",
                      animation: "typingDots 1.4s infinite 0.2s",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#64ffda",
                      animation: "typingDots 1.4s infinite 0.4s",
                    }}
                  />
                </div>
              </div>
            </div>
            )}

            {/* Clear Button - Sticky at bottom */}
            {messages.length > 0 && (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "0.5rem",
                  zIndex: 5,
                }}
              >
                <button
                  onClick={() => {
                    setMessages([]);
                    setIsTyping(false);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(10, 25, 47, 0.95)",
                    border: "1px solid rgba(100, 255, 218, 0.3)",
                    borderRadius: "20px",
                    color: "#64ffda",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "rgba(100, 255, 218, 0.2)";
                    e.target.style.borderColor = "#64ffda";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "rgba(10, 25, 47, 0.95)";
                    e.target.style.borderColor = "rgba(100, 255, 218, 0.3)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chat Input Box */}
        <div
          style={{
            width: "100%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            onClick={() => setShowDropdown(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem",
              borderRadius: "25px",
              backgroundColor: "rgba(10, 25, 47, 0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(100, 255, 218, 0.2)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              cursor: "text",
            }}
          >
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowDropdown(true)}
              placeholder="I’m a whistleblower of Abhishek Gattineni. Ask me anything about him."
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "#ccd6f6",
                fontSize: "0.95rem",
                padding: "0.5rem 1rem",
                resize: "none",
                maxHeight: "120px",
                fontFamily: "inherit",
                overflow: "hidden",
              }}
              rows={1}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendMessage();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: inputValue.trim()
                  ? "rgba(100, 255, 218, 0.2)"
                  : "rgba(100, 255, 218, 0.1)",
                border: "1px solid rgba(100, 255, 218, 0.3)",
                color: "#64ffda",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                flexShrink: 0,
                padding: 0,
                overflow: "hidden",
                outline: "none",
                boxShadow: "none",
              }}
              onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              }}
              onBlur={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  display: "block",
                  backgroundColor: "transparent",
                }}
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p
            style={{
              color: "#8892b0",
              fontSize: "0.75rem",
              textAlign: "center",
              marginTop: "0.5rem",
              opacity: 0.7,
            }}
          >
            Press Enter to send, Shift+Enter for new line
          </p>

          {/* Dropdown for Predefined Questions */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                bottom: "100%",
                left: 0,
                right: 0,
                marginBottom: "0.75rem",
                backgroundColor: "rgba(10, 25, 47, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(100, 255, 218, 0.3)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 10,
                animation: "fadeInUp 0.3s ease-out",
              }}
            >
              <div
                style={{
                  padding: "0.5rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem 1rem",
                    color: "#8892b0",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    borderBottom: "1px solid rgba(100, 255, 218, 0.1)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Suggested Questions
                </div>
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionSelect(question)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#ccd6f6",
                      fontSize: "0.9rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderRadius: "8px",
                      marginBottom: "0.25rem",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "rgba(100, 255, 218, 0.1)";
                      e.target.style.color = "#64ffda";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#ccd6f6";
                    }}
                  >
                    <span
                      style={{
                        marginRight: "0.5rem",
                        color: "#64ffda",
                        fontSize: "0.85rem",
                      }}
                    >
                      →
                    </span>
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "1rem",
          marginTop: "auto",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => executeScroll(refs.aboutRef)}
      >
        <p
          style={{
            color: "#8892b0",
            fontSize: "0.8rem",
            marginBottom: "0.5rem",
            letterSpacing: "1px",
          }}
        >
          scroll down for more info
        </p>
        <div
          style={{
            animation: "bounce 2s infinite",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64ffda"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

    </div>
  );
};

export default Main;

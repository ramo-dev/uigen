"use client";
import { useEffect, useState } from "react";
import { Button, Input, Tabs, Tooltip, Spin, message } from "antd";
import { FaRegClipboard } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import DynamicComponent from "./DynamicHtml"
import DOMPurify from "dompurify";

const { TextArea } = Input;

const Page = () => {
  const html = `<h1 class="text-base text-white bg-blue-400 rounded-full text-center m-5 mx-auto w-max p-2 border">Enter Prompt to begin generating ui</h1>`;
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState(html);
  const [activeTab, setActiveTab] = useState("1");
  const [tooltip, setTooltip] = useState(true);
  const [loading, setLoading] = useState(false);


  const sanitizePrompt = (input) => {
    return input.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
  };

  const fetchTextFromBackend = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
        
      });
      const data = await resp.json();

      const generated = data.code;
    //   console.log("Generated HTML:", generated); 

      const cleanedCode = DOMPurify.sanitize(generated);
    //   console.log("Cleaned HTML:", cleanedCode); 

      setTimeout(() => {
        setGeneratedCode(cleanedCode);
        setLoading(false);
      }, 5000);
    } catch (err) {
      setLoading(false);
      message.error(err);
    }
  };

  const copyToClipboard = () => {
    if (generatedCode.trim() !== "") {
      navigator.clipboard
        .writeText(generatedCode)
        .then(() => {
          message.success("Code copied to clipboard!");
        })
        .catch((err) => {
          message.error("Failed to copy code", err);
        });
    }
  };

  const tabsItems = [
    { tab: "Preview", key: "1" },
    { tab: "Copy Code", key: "2" },
  ];

  //   create a card with blue background

  useEffect(() => {
    const timer = setTimeout(() => {
      setTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 h-full bg-white">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="mt-4"
      >
        {tabsItems.map((item) => (
          <Tabs.TabPane tab={item.tab} key={item.key}>
            {item.key === "1" ? (
              <>
                <p className="text-lg font-semibold">Generated UI Preview:</p>
                <div className="relative mt-4 min-h-[40vh] border rounded-md">
                  {loading ? (
                    <Spin
                      className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2"
                      size="large"
                      percent="auto"
                    />
                  ) : (
                    <DynamicComponent generatedCode={generatedCode}/>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={copyToClipboard}
                  className="ms-auto"
                  icon={<FaRegClipboard />}
                >
                  Copy
                </Button>
                <div className="mt-4 min-h-40">
                  <p className="text-lg font-semibold">Generated UI Code:</p>
                  {loading ? (
                    <Spin
                      className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2"
                      size="large"
                      percent="auto"
                    />
                  ) : (
                    <TextArea
                      className="bg-gray-100 p-4 w-full mt-2 rounded-md"
                      rows={8}
                      value={generatedCode}
                      readOnly
                    />
                  )}
                </div>
              </>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>

      <label className="block text-sm font-medium text-gray-700 my-3">
        Enter Prompt:
      </label>
      <div className="mb-4 relative border h-max w-full bg-gray-200 border-black rounded-md">
        <Tooltip open={tooltip} title="prompt to create ui">
          <textarea
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-inherit p-3 focus:outline-none focus:border-none focus:ring-0 block w-full sm:text-sm rounded-md h-max min-h-15 border-none ring-0 outline-none"
          />
        </Tooltip>

        <div className="flex justify-end mt-2">
          <Button
            type="primary"
            shape="circle"
            className="m-2 my-3 scale-125"
            onClick={fetchTextFromBackend}
            icon={<BsStars className="text-xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

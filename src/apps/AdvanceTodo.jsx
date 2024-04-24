import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";

// to get todo from Local storage
const getLocalTodos = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const AdvanceTodo = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(getLocalTodos());
  const [priority, setPriority] = useState("medium");
  const [inProgress, setInProgress] = useState("no");
  const [Date, setDate] = useState("Not Scheduled");
  const [doneTodos, setDoneTodos] = useState([]);
  const [isDark, setIsDark] = useState(false);

  //add todo
  const addTodo = () => {
    if (todo !== "") {
      const todoObject = {
        title: todo,
        priority: priority,
        inProgress: inProgress,
        date: Date,
      };
      setAllTodos([todoObject, ...allTodos]);
      setTodo("");
      setPriority("medium");
      setInProgress("no");
      setDate("Not Scheduled");
    } else {
      alert("Please enter somthing before adding");
    }
  };

  //filtering todos 
  const inProgressTodos = allTodos.filter((item) => item.inProgress == "yes");
  const scheduledTodos = allTodos.filter(
    (item) => item.date !== "Not Scheduled"
  );
  const priorityTodos = allTodos.filter(
    (item) => item.priority !== "unimportant"
  );

  //save to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(allTodos));
  }, [allTodos]);

  //delete todo one by one
  const deleteTodo = (index) => {
    const currentList = [...allTodos];
    currentList.splice(index, 1);
    setAllTodos(currentList);
  };

  // add to completed todos

  const handleCompletedTodos = (index) => {
    const tempTodoList = [...allTodos];
    const checkedTodo = tempTodoList.splice(index, 1)[0];
    setAllTodos(tempTodoList);
    setDoneTodos([...doneTodos, checkedTodo]);
    // const tempTodo = allTodos[index];
    // const updatedTodos =tempTodo.splice(index,1);
    // setAllTodos(updatedTodos);
    // setDoneTodos([...doneTodos, completedTodo]);
    // const checkedTodo = allTodos[index];
    // const updatedTodos
  };

  const deleteCompletedTodo = (index)=>{
const tempDoneTodo = [...doneTodos];
tempDoneTodo.splice(index,1);
setDoneTodos(tempDoneTodo);
  }

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      addTodo();
    }
  };

  // handle darkmode

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="center flex-col md:flex-row h-screen ">
      <div className=" p-5 flex md:flex-col  gap-5 justify-between order-none md:order-1  text-sm">
        <a
          href="https://github.com/kislayrajj/AvanceTO-DO-app-React-shadcn"
          target="_black">
          <div className={` size-10 center rounded-full ${isDark ? " bg-gray-700 text-white" : "bg-gray-200"}`}>
            <i class="fa-brands fa-github"></i>
          </div>
        </a>
        <div
          onClick={handleDarkMode}
          className={` size-10 center rounded-full ${isDark ? " bg-gray-700 text-white" : "bg-gray-200"}`}>
          {isDark ? (
            <i className="fa-regular fa-lightbulb"></i>
          ) : (
            <i className="fa-regular fa-moon"></i>
          )}
        </div>
      </div>
      <div className="">
        <Tabs
          defaultValue="allTodos"
          className="w-[350px] md:w-[600px] h-[500px] rounded-md ">
          <TabsList
            className={`grid w-full gap-2 grid-cols-5 md:h-11 ${
              isDark ? "bg-gray-700 text-white/30" : "bg-violet-100"
            }`}>
            <TabsTrigger
              value="allTodos"
              className=" text-xs md:text-base relative ">
              All Todo
              <div
                className={`absolute top-0 md:top-1 right-0  md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ${
                  isDark ? "bg-gray-500 text-white" : "bg-violet-300"
                } `}>
                {allTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="inProgress"
              className=" text-xs md:text-base relative">
              In Progress
              <div
                className={`absolute top-0 md:top-1 right-0  md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ${
                  isDark ? "bg-gray-500 text-white" : "bg-violet-300"
                } `}>
                {inProgressTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className=" text-xs md:text-base relative">
              Scheduled
              <div
                className={`absolute top-0 md:top-1 right-0  md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ${
                  isDark ? "bg-gray-500 text-white" : "bg-violet-300"
                } `}>
                {scheduledTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="priority"
              className=" text-xs md:text-base relative">
              Priority
              <div
                className={`absolute top-0 md:top-1 right-0  md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ${
                  isDark ? "bg-gray-500 text-white" : "bg-violet-300"
                } `}>
                {priorityTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className=" text-xs md:text-base relative">
              Completed
              <div
                className={`absolute top-0 md:top-1 right-0  md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ${
                  isDark ? "bg-gray-500 text-white" : "bg-violet-300"
                } `}>
                {doneTodos.length}
              </div>
            </TabsTrigger>
          </TabsList>

          {/* All todoes */}
          <TabsContent value="allTodos">
            <Card
              className={`h-[450px] ${
                isDark ? "bg-slate-900 text-white" : "bg-violet-200"
              }`}>
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                All Todoes
              </CardTitle>
              <CardContent className="">
                <div className="">
                  <Input
                    id="enterInput"
                    placeholder="Enter TO-DO"
                    value={todo}
                    onKeyDown={handleEnter}
                    onChange={(e) => {
                      setTodo(e.target.value);
                    }}
                    className=" h-8 md:h-auto text-black"
                  />
                  <div className="options mt-2 flex flex-wrap  gap-2 md:gap-4 items-end">
                    <div
                      className={` flex flex-col items-start rounded-md p-1 ${
                        isDark ? "bg-gray-600" : " bg-violet-400"
                      }`}>
                      <div className=" text-sm md:text-base">Priority</div>
                      <select
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className=" text-black py-0 md:py-1 md:px-1 rounded-md w-[70px] md:w-[110px] h-5 md:h-8 text-xs md:text-base">
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                        <option value="high">High </option>
                        <option value="unimportant">Unimportant </option>
                      </select>
                    </div>
                    <div
                      className={` flex flex-col items-start rounded-md p-1 ${
                        isDark ? "bg-gray-600" : " bg-violet-400"
                      }`}>
                      <div className=" text-sm md:text-base ">In Progress</div>
                      <select
                        type="text"
                        value={inProgress}
                        onChange={(e) => setInProgress(e.target.value)}
                        className=" text-black py-0 md:py-1 md:px-3 rounded-md w-[70px] md:w-[110px]  h-5 md:h-8 text-xs md:text-base">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div
                      className={` flex flex-col items-start rounded-md p-1 ${
                        isDark ? "bg-gray-600" : " bg-violet-400"
                      }`}>
                      <div className=" text-sm md:text-base">Schedule</div>
                      <Input
                        id="date"
                        type="date"
                        value={Date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        className="text-black py-0 md:py-1 px-0 md:px-1 rounded-md w-[90px] md:w-[140px] h-5 md:h-8 text-[10px] md:text-base"
                      />
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={addTodo}
                            className={`px-1 md:px-5  flex
                    gap-2 center ${isDark ? "bg-gray-600 hover:bg-gray-700" : ""}`}>
                            <span className="hidden md:block"> Add</span>

                            <i className="fa-solid fa-plus text-[15px] md:text-base"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to the list</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* all todos list (mapping) */}

                  <ScrollArea className="h-[280px] mt-1 ">
                    {allTodos.length === 0 ? (
                      <div className="mt-2">No TO-DOs Yet ..</div>
                    ) : (
                      allTodos.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative text-xs md:text-base">
                            <div
                              className={`flex justify-between px-1  mt-1 rounded-md pb-7 ${
                                isDark ? " bg-gray-800" : "bg-violet-300 "
                              } `}>
                              <div className="center items-center gap-1">
                                <div className="center">
                                  <input
                                    type="checkbox"
                                    onClick={() => handleCompletedTodos(index)}
                                    className="bg-red-500 "
                                  />
                                </div>
                                {index + 1}. {item.title}
                              </div>
                            </div>
                            <div className="flex  pl-1 items-center gap-2 md:gap-5  absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                              <i
                                class={` fa-solid fa-circle text-[5px] md:text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                  (item?.priority === "low" &&
                                    "text-green-600") ||
                                  (item?.priority === "medium" &&
                                    "text-yellow-500") ||
                                  (item?.priority === "high" && "text-red-600")
                                } `}>
                                {item.priority[0]}P
                              </i>
                              <span className=" text-[8px] md:text-[10px] h-4 mb-0.5 md:mb-0 center flex-1 bg-violet-200 rounded-md  text-center text-slate-600">
                                {item.date}
                              </span>
                              <div
                                className="flex-1 "
                                onClick={() => {
                                  deleteTodo(index);
                                }}>
                                <i class="fa-solid fa-trash-can text-red-500 text-[8px] md:text-[12px] "></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>

          {/* ...........in progress tab............... */}

          <TabsContent value="inProgress">
            <Card
              className={`h-[450px] ${
                isDark ? "bg-slate-900 text-white" : "bg-violet-200"
              }`}>
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                In Progress
              </CardTitle>

              <CardContent className="">
                <ScrollArea className="h-[380px] ">
                {inProgressTodos.length === 0 ? (
                      <div className="mt-2">No TO-DOs are in Progress Yet ..</div>
                    ) : (
                      inProgressTodos.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative text-xs md:text-base">
                            <div
                              className={`flex justify-between px-1  mt-1 rounded-md pb-7 ${
                                isDark ? " bg-gray-800" : "bg-violet-300 "
                              } `}>
                              <div className="center items-center gap-1">
                                <div className="center">
                                  <input
                                    type="checkbox"
                                    onClick={() => handleCompletedTodos(index)}
                                    className="bg-red-500 "
                                  />
                                </div>
                                {index + 1}. {item.title}
                              </div>
                            </div>
                            <div className="flex  pl-1 items-center gap-2 md:gap-5  absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                              <i
                                class={` fa-solid fa-circle text-[5px] md:text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                  (item?.priority === "low" &&
                                    "text-green-600") ||
                                  (item?.priority === "medium" &&
                                    "text-yellow-500") ||
                                  (item?.priority === "high" && "text-red-600")
                                } `}>
                                {item.priority[0]}P
                              </i>
                              <span className=" text-[8px] md:text-[10px] h-4 mb-0.5 md:mb-0 center flex-1 bg-violet-200 rounded-md  text-center text-slate-600">
                                {item.date}
                              </span>
                              <div
                                className="flex-1 "
                                onClick={() => {
                                  deleteTodo(index);
                                }}>
                                <i class="fa-solid fa-trash-can text-red-500 text-[8px] md:text-[12px] "></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* .....................scheduled todos.......... */}

          <TabsContent value="scheduled">
            <Card
              className={`h-[450px] ${
                isDark ? "bg-slate-900 text-white" : "bg-violet-200"
              }`}>
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                Scheduled
              </CardTitle>

              <CardContent className="">
                <ScrollArea className="h-[380px]">
                {scheduledTodos.length === 0 ? (
                      <div className="mt-2">No Upcoming TO-DOs ..</div>
                    ) : (
                      scheduledTodos.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative text-xs md:text-base">
                            <div
                              className={`flex justify-between px-1  mt-1 rounded-md pb-7 ${
                                isDark ? " bg-gray-800" : "bg-violet-300 "
                              } `}>
                              <div className="center items-center gap-1">
                                <div className="center">
                                  <input
                                    type="checkbox"
                                    onClick={() => handleCompletedTodos(index)}
                                    className="bg-red-500 "
                                  />
                                </div>
                                {index + 1}. {item.title}
                              </div>
                            </div>
                            <div className="flex  pl-1 items-center gap-2 md:gap-5  absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                              <i
                                class={` fa-solid fa-circle text-[5px] md:text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                  (item?.priority === "low" &&
                                    "text-green-600") ||
                                  (item?.priority === "medium" &&
                                    "text-yellow-500") ||
                                  (item?.priority === "high" && "text-red-600")
                                } `}>
                                {item.priority[0]}P
                              </i>
                              <span className=" text-[8px] md:text-[10px] h-4 mb-0.5 md:mb-0 center flex-1 bg-violet-200 rounded-md  text-center text-slate-600">
                                {item.date}
                              </span>
                              <div
                                className="flex-1 "
                                onClick={() => {
                                  deleteTodo(index);
                                }}>
                                <i class="fa-solid fa-trash-can text-red-500 text-[8px] md:text-[12px] "></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ...........priority ......... */}

          <TabsContent value="priority">
            <Card
              className={`h-[450px] ${
                isDark ? "bg-slate-900 text-white" : "bg-violet-200"
              }`}>
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                In Progress
              </CardTitle>

              <CardContent className="">
                <ScrollArea className="h-[380px]">
                {priorityTodos.length === 0 ? (
                      <div className="mt-2">No Important TO-DOs ..</div>
                    ) : (
                      priorityTodos.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative text-xs md:text-base">
                            <div
                              className={`flex justify-between px-1  mt-1 rounded-md pb-7 ${
                                isDark ? " bg-gray-800" : "bg-violet-300 "
                              } `}>
                              <div className="center items-center gap-1">
                                <div className="center">
                                  <input
                                    type="checkbox"
                                    onClick={() => handleCompletedTodos(index)}
                                    className="bg-red-500 "
                                  />
                                </div>
                                {index + 1}. {item.title}
                              </div>
                            </div>
                            <div className="flex  pl-1 items-center gap-2 md:gap-5  absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                              <i
                                class={` fa-solid fa-circle text-[5px] md:text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                  (item?.priority === "low" &&
                                    "text-green-600") ||
                                  (item?.priority === "medium" &&
                                    "text-yellow-500") ||
                                  (item?.priority === "high" && "text-red-600")
                                } `}>
                                {item.priority[0]}P
                              </i>
                              <span className=" text-[8px] md:text-[10px] h-4 mb-0.5 md:mb-0 center flex-1 bg-violet-200 rounded-md  text-center text-slate-600">
                                {item.date}
                              </span>
                              <div
                                className="flex-1 "
                                onClick={() => {
                                  deleteTodo(index);
                                }}>
                                <i class="fa-solid fa-trash-can text-red-500 text-[8px] md:text-[12px] "></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* completed todos */}
          <TabsContent value="completed">
            <Card
              className={`h-[450px] ${
                isDark ? "bg-slate-900 text-white" : "bg-violet-200"
              }`}>
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                Completed
              </CardTitle>

              <CardContent className="">
                <ScrollArea className="h-[380px]  ">
                {doneTodos.length === 0 ? (
                      <div className="mt-2">Completed TO-DOs will appear here ..</div>
                    ) : (
                      doneTodos.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative text-xs md:text-base">
                            <div
                              className={`flex justify-between px-1  mt-1 rounded-md pb-7 ${
                                isDark ? " bg-gray-800" : "bg-violet-300 "
                              } `}>
                              <div className=" px-1 ">
                                
                                {index + 1}. {item.title}
                              </div>
                            </div>
                            <div className="flex  pl-1 items-center gap-2 md:gap-5  absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                              <i
                                class={` fa-solid fa-circle text-[5px] md:text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                  (item?.priority === "low" &&
                                    "text-green-600") ||
                                  (item?.priority === "medium" &&
                                    "text-yellow-500") ||
                                  (item?.priority === "high" && "text-red-600")
                                } `}>
                                {item.priority[0]}P
                              </i>
                              <span className=" text-[8px] md:text-[10px] h-4 mb-0.5 md:mb-0 center flex-1 bg-violet-200 rounded-md  text-center text-slate-600">
                                {item.date}
                              </span>
                              <div
                                className="flex-1 "
                                onClick={() => {
                                  deleteCompletedTodo(index);
                                }}>
                                <i class="fa-solid fa-trash-can text-red-500 text-[8px] md:text-[12px] "></i>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default AdvanceTodo;

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
    <div className="center h-screen ">
      <div className=" p-5 flex flex-col gap-2 justify-between order-1 text-sm">
        <a href="https://github.com/kislayrajj/AvanceTO-DO-app-React-shadcn" target="_black"><div className="bg-gray-200 size-10 center rounded-full">
        <i class="fa-brands fa-github"></i>
        </div></a>
        <div
          onClick={handleDarkMode}
          className="bg-gray-200 size-10 center rounded-full">
          {isDark ?  <i className="fa-regular fa-lightbulb"></i> : <i className="fa-regular fa-moon"></i> }


        
        </div>
      </div>
      <div className="">
        <Tabs
          defaultValue="allTodos"
          className="w-[350px] md:w-[600px] h-[500px] overflow-hidden ">
          <TabsList className="grid w-full gap-2 grid-cols-5">
            <TabsTrigger
              value="allTodos"
              className=" text-xs md:text-base relative">
              All Todo
              <div className="absolute top-0 md:top-1 right-0 bg-violet-300 md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ">
                {allTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="inProgress"
              className=" text-xs md:text-base relative">
              In Progress
              <div className="absolute top-0 md:top-1 right-0 bg-violet-300 md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ">
                {inProgressTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className=" text-xs md:text-base relative">
              Scheduled
              <div className="absolute top-0 md:top-1 right-0 bg-violet-300 md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ">
                {scheduledTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="priority"
              className=" text-xs md:text-base relative">
              Priority
              <div className="absolute top-0 md:top-1 right-0 bg-violet-300 md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ">
                {priorityTodos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className=" text-xs md:text-base relative">
              Completed
              <div className="absolute top-0 md:top-1 right-0 bg-violet-300 md:size-4 size-3 text-[10px] center md:text-[12px] rounded-full ">
                {doneTodos.length}
              </div>
            </TabsTrigger>
          </TabsList>

          {/* All todoes */}
          <TabsContent value="allTodos">
            <Card className={`h-[450px] ${isDark ? "bg-slate-700" : "bg-violet-200"}`}>
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
                    className=""
                  />
                  <div className="options mt-2 flex flex-wrap  gap-2 md:gap-4 items-end">
                    <div className=" flex flex-col items-start rounded-md bg-violet-400 p-1">
                      <div className="">Priority</div>
                      <select
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className=" py-1 px-3 rounded-md w-[110px] h-8">
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                        <option value="high">High </option>
                        <option value="unimportant">Unimportant </option>
                      </select>
                    </div>
                    <div className=" flex flex-col items-start rounded-md bg-violet-400 p-1">
                      <div className="">In Progress</div>
                      <select
                        type="text"
                        value={inProgress}
                        onChange={(e) => setInProgress(e.target.value)}
                        className="  py-1 px-3 rounded-md w-[110px] h-8">
                        <option value="no">no</option>
                        <option value="yes">yes</option>
                      </select>
                    </div>
                    <div className=" flex flex-col items-start rounded-md bg-violet-400 p-1">
                      <div className="">Schedule</div>
                      <Input
                        id="date"
                        type="date"
                        value={Date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        className="w-[140px] h-8"
                      />
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={addTodo}
                            className="px-5 h-10 flex
                    gap-2 center">
                            Add<i className="fa-solid fa-plus"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to the list</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* all todoes list (mapping) */}

                  <div className="contents bg-black">
                    {allTodos.map((item, index) => {
                      return (
                        <div key={index} className="relative">
                          <div className="flex justify-between px-1 bg-violet-300  mt-1 rounded-md pb-7 ">
                            <div className="center gap-1">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  onClick={() => handleCompletedTodos(index)}
                                  className="bg-red-500"
                                />
                              </div>
                              {index + 1}. {item.title}
                            </div>
                          </div>
                          <div className="flex  pl-1 items-center gap-5 absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                            <i
                              class={` fa-solid fa-circle text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                                (item?.priority === "low" &&
                                  "text-green-600") ||
                                (item?.priority === "medium" &&
                                  "text-yellow-500") ||
                                (item?.priority === "high" && "text-red-600")
                              } `}>
                              {item.priority[0]}P
                            </i>
                            <span className="text-[10px] flex-1 bg-violet-200 rounded-md p-0.5 text-center text-slate-600">
                              {item.date}
                            </span>
                            <div
                              className="flex-1 "
                              onClick={() => {
                                deleteTodo(index);
                              }}>
                              <i class="fa-solid fa-trash-can text-red-500 text-[12px] "></i>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>

          {/* ...........in progress tab............... */}

          <TabsContent value="inProgress">
            <Card className="h-[450px] bg-violet-200">
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                In Progress
              </CardTitle>

              <CardContent className="">
                <div className="">
                  {inProgressTodos.map((item, index) => {
                    return (
                      <div key={index} className="relative">
                        <div className="flex justify-between px-1 bg-violet-300  mt-1 rounded-md pb-7 ">
                          <div className="center gap-1">
                            <div>
                              {" "}
                              <input
                                type="checkbox"
                                onClick={() => handleCompletedTodos(index)}
                                className="bg-red-500"
                              />
                            </div>
                            {index + 1}. {item.title}
                          </div>
                        </div>
                        <div className="flex  pl-1 items-center gap-5 absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                          <i
                            class={` fa-solid fa-circle text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                              (item?.priority === "low" && "text-green-600") ||
                              (item?.priority === "medium" &&
                                "text-yellow-500") ||
                              (item?.priority === "high" && "text-red-600")
                            } `}>
                            {item.priority[0]}P
                          </i>
                          <span className="text-[10px] flex-1 bg-violet-200 rounded-md p-0.5 text-center text-slate-600">
                            {item.date}
                          </span>
                          <div
                            className="flex-1 "
                            onClick={() => {
                              deleteTodo(index);
                            }}>
                            <i class="fa-solid fa-trash-can text-red-500 text-[12px] "></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* .....................scheduled todos.......... */}

          <TabsContent value="scheduled">
            <Card className="h-[450px] bg-violet-200">
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                Scheduled
              </CardTitle>

              <CardContent className="">
                <div className="">
                  {scheduledTodos.map((item, index) => {
                    return (
                      <div key={index} className="relative">
                        <div className="flex justify-between px-1 bg-violet-300  mt-1 rounded-md pb-7 ">
                          <div className="center gap-1">
                            <div>
                              {" "}
                              <input
                                type="checkbox"
                                onClick={() => handleCompletedTodos(index)}
                                className="bg-red-500"
                              />
                            </div>
                            {index + 1}. {item.title}
                          </div>
                        </div>
                        <div className="flex  pl-1 items-center gap-5 absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                          <i
                            class={` fa-solid fa-circle text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                              (item?.priority === "low" && "text-green-600") ||
                              (item?.priority === "medium" &&
                                "text-yellow-500") ||
                              (item?.priority === "high" && "text-red-600")
                            } `}>
                            {" "}
                            {item.priority[0]}P
                          </i>
                          <span className="text-[10px] flex-1 bg-violet-200 rounded-md p-0.5 text-center text-slate-600">
                            {item.date}
                          </span>
                          <div
                            className="flex-1 "
                            onClick={() => {
                              deleteTodo(index);
                            }}>
                            <i class="fa-solid fa-trash-can text-red-500 text-[12px] "></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ...........priority ......... */}

          <TabsContent value="priority">
            <Card className="h-[450px] bg-violet-200">
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                In Progress
              </CardTitle>

              <CardContent className="">
                <div className="">
                  {priorityTodos.map((item, index) => {
                    return (
                      <div key={index} className="relative">
                        <div className="flex justify-between px-1 bg-violet-300  mt-1 rounded-md pb-7 ">
                          <div className="center gap-1">
                            <div>
                              {" "}
                              <input
                                type="checkbox"
                                onClick={() => handleCompletedTodos(index)}
                                className="bg-red-500"
                              />
                            </div>
                            {index + 1}. {item.title}
                          </div>
                        </div>
                        <div className="flex  pl-1 items-center gap-5 absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                          <i
                            class={` fa-solid fa-circle text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                              (item?.priority === "low" && "text-green-600") ||
                              (item?.priority === "medium" &&
                                "text-yellow-500") ||
                              (item?.priority === "high" && "text-red-600")
                            } `}>
                            {" "}
                            {item.priority[0]}P
                          </i>
                          <span className="text-[10px] flex-1 bg-violet-200 rounded-md p-0.5 text-center text-slate-600">
                            {item.date}
                          </span>
                          <div
                            className="flex-1 "
                            onClick={() => {
                              deleteTodo(index);
                            }}>
                            <i class="fa-solid fa-trash-can text-red-500 text-[12px] "></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* completed todos */}
          <TabsContent value="completed">
            <Card className="h-[450px] bg-violet-200">
              <CardTitle className="text-lg md:text-xl px-7 py-4 pb-2 ">
                Completed
              </CardTitle>

              <CardContent className="">
                <div className="">
                  {doneTodos.map((item, index) => {
                    return (
                      <div key={index} className="relative">
                        <div className="flex justify-between px-1 bg-violet-300  mt-1 rounded-md pb-7 ">
                          <div className="center gap-1">
                            <div>
                              {" "}
                              <input
                                type="checkbox"
                                onClick={() => handleCompletedTodos(index)}
                                className="bg-red-500"
                              />
                            </div>
                            {index + 1}. {item.title}
                          </div>
                        </div>
                        <div className="flex  pl-1 items-center gap-5 absolute z-10 bottom-0   w-[250px] opacity-80 hover:opacity-100  ease-in-out duration-300">
                          <i
                            class={` fa-solid fa-circle text-[8px] tracking-widest bg-violet-200 rounded-md p-1  ${
                              (item?.priority === "low" && "text-green-600") ||
                              (item?.priority === "medium" &&
                                "text-yellow-500") ||
                              (item?.priority === "high" && "text-red-600")
                            } `}>
                            {" "}
                            {item.priority[0]}P
                          </i>
                          <span className="text-[10px] flex-1 bg-violet-200 rounded-md p-0.5 text-center text-slate-600">
                            {item.date}
                          </span>
                          <div
                            className="flex-1 "
                            onClick={() => {
                              deleteTodo(index);
                            }}>
                            <i class="fa-solid fa-trash-can text-red-500 text-[12px] "></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default AdvanceTodo;

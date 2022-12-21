import React, { useEffect } from "react";
import { useState } from "react";
import "./dnd.css";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import tone from "../assets/notification.mp3";
import added from "../assets/added.mp3";
import deleted from "../assets/delete.mp3";

const DragAndDrop = () => {
  const [state, setState] = useState([
    { id: uuidv4(), name: "Learn Angular", category: "red", color: "white" },
    { id: uuidv4(), name: "React", category: "blue", color: "white" },
    { id: uuidv4(), name: "Vue", category: "black", color: "white" },
    { id: uuidv4(), name: "HTML", category: "green", color: "white" },
  ]);

  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [display, setDisplay] = useState("none");
  const [colorClick, setColorClick] = useState("");

  const addFn = () => {
    if (tasks[colorClick + "Count"] == 8) {
      alert(`${colorClick} stack limit exceeded. Max Limit is 8`);
      setText("");
      setColorClick("");
      setDisplay("none");
      return;
    }
    setText("");
    setColorClick("");
    setDisplay("none");
    let data = {
      id: uuidv4(),
      name: text,
      category: colorClick,
      color: "white",
    };
    console.log({ ...state, data });
    const audio = new Audio(added);
    audio.play();
    setState([...state, data]);
  };

  const editItem = (ind, val) => {
    let val1 = prompt("Please write edited Text", val);
    let newArr = [...state];
    newArr[ind].name = val1;
    setState(newArr);
  };

  const deleteItem = (ind) => {
      const audio = new Audio(deleted);
      audio.play();
      setState(curr => curr.filter((el, index) => index != ind));    
  }

  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, val) => {
    let id = ev.dataTransfer.getData("id");
    console.log("onDrop", id);
    let ind1 = -1;
    state.map((task, ind) => {
      if (task.id == id) {
        ind1 = ind;
      }
    });

    let temp = state[ind1];
    let newArr = [...state];

    newArr.splice(ind1, 1);
    newArr.push(temp);
    let tasks = newArr.filter((task) => {
      if (task.id == id) {
        task.category = val;
      }
      return task;
    });

    const audio = new Audio(tone);
    audio.play();
    setState(tasks);
  };

  var tasks = {
    red: [],
    blue: [],
    green: [],
    black: [],
    redCount: 0,
    blueCount: 0,
    greenCount: 0,
    blackCount: 0,
  };

  return (
    <>
    {console.log(state)}
      {state?.forEach((t, ind) => {
        tasks[t.category].push(
            
          <div
            key={t.id}
            onDragStart={(e) => onDragStart(e, t.id)}
            draggable
            onClick={() => editItem(ind, t.name)}
            className="draggable"
            style={{
              backgroundColor: t.category,
              color: t.color,
              marginTop: "10px",
              position: "relative",
              
            }}
          >
            <AiFillCloseCircle onClick={(e) => {e.stopPropagation() ; deleteItem(ind)}} className="closeIcon"/>
            {t.name}
          </div>
        );
        tasks[t.category + "Count"]++;
      })}

      <Heading
        position={"fixed"}
        top={0}
        zIndex={2}
        w="100%"
        backgroundColor={"white"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        textAlign={"center"}
        padding={5}
      >
        ZINO TECHNOLOGIES
      </Heading>
      <Flex
        w={"50%"}
        margin="auto"
        marginTop={"111px"}
        alignItems={"center"}
        marginBottom={10}
        gap={2}
      >
        <Input
          onChange={(e) => setText(e.target.value)}
          display={display}
          value={text}
          placeholder={`Write here to add in ${colorClick} stack`}
          margin={"auto"}
          autoFocus
        />
        <Button
          disabled={text == "" ? true : false}
          display={display}
          colorScheme="red"
          onClick={() => {
            addFn();
          }}
        >
          ADD
        </Button>
      </Flex>
      <SimpleGrid
        w={"75%"}
        margin="auto"
        marginBottom={"50px"}
        columns={[1, 1, 4, 4]}
        gap={5}
        className="mainDiv"
      >
        <div
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => {
            onDrop(e, "red");
          }}
        >
          <span className="task-header">RED</span>
          <Button
            onClick={() => {
              setDisplay("block");
              setColorClick("red");
            }}
            colorScheme={"orange"}
          >
            ADD
          </Button>

          {tasks.red}
        </div>
        <div
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "blue")}
        >
          <span className="task-header">BLUE</span>
          <Button
            colorScheme={"orange"}
            onClick={() => {
              setDisplay("block");
              setColorClick("blue");
            }}
          >
            ADD
          </Button>
          {tasks.blue}
        </div>

        <div
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "green")}
        >
          <span className="task-header">GREEN</span>
          <Button
            colorScheme={"orange"}
            onClick={() => {
              setDisplay("block");
              setColorClick("green");
            }}
          >
            ADD
          </Button>
          {tasks.green}
        </div>

        <div
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "black")}
        >
          <span className="task-header">BLACK</span>
          <Button
            colorScheme={"orange"}
            onClick={() => {
              setDisplay("block");
              setColorClick("black");
            }}
          >
            ADD
          </Button>
          {tasks.black}
        </div>
      </SimpleGrid>
      <Box
        position="fixed"
        backgroundColor={"black"}
        color="white"
        bottom={0}
        w="100%"
      >
        <Text
          textAlign={"center"}
          fontWeight="bold"
          fontSize={"1rem"}
          padding={2}
        >
          <span> 😀 </span>Built by Siddikkhan Pathan <span> 😀 </span>
        </Text>
      </Box>
    </>
  );
};

export default DragAndDrop;

import axios from "axios";

const fetchTodo = async () => {
    const response = await axios.get(`http://localhost:4000/todos`);
    console.log(response);
};

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Delete from '../assets/images/delete.svg';
import Star from '../assets/images/star.png';
import Star2 from '../assets/images/star2.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 250,
};

export default function Hero() {
  const [open, setOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterOption, setFilterOption] = React.useState("all");

  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCurrentItem(e.target.value);
  }

  const handleCancel = () => {
    handleClose();
  }

  const handleAddTask = () => {
    const newTasks = [...tasks, { task: currentItem, starred: false }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setCurrentItem(""); 
    handleClose();
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const handleStarTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].starred = !updatedTasks[index].starred;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  }

  const filteredTasks = tasks
    .filter(task => typeof task.task === 'string') // Filter only strings
    .filter(task => {
      if (filterOption === "starred") {
        return task.starred && task.task.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterOption === "unstarred") {
        return !task.starred && task.task.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return task.task.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

  return (
    <div>
      <div className='todo'>
        <h2>Todo List</h2>
        <Button className='btn2' onClick={handleOpen}>Add Tasks</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='box' sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Task Name
            </Typography>
            <input className='input' type="text" value={currentItem} onChange={handleChange} />
            <div className='btn'>
              <Button className='b1' onClick={handleCancel}>Cancel</Button>
              <Button className='b2' onClick={handleAddTask}>Add task</Button>
            </div>
          </Box>
        </Modal>
      </div> 
      <div className='task'>
        <div className='search'>
          <input className='b4' type="text" placeholder="Search tasks" value={searchTerm} onChange={handleSearch} />
          <select className='b5' onChange={handleFilterChange} value={filterOption}>
            <option value="all">All</option>
            <option value="starred">Starred</option>
            <option value="unstarred">Unstarred</option>
          </select>
        </div>
        <h3>Tasks</h3>
        <div className='tab' >
          {filteredTasks.map((task, index) => (
            <div className='icons' key={index}>
              {task.task}
              <img className='delete' src={Delete} alt="delete" onClick={() => handleDeleteTask(index)} />
              <img className='star-icon' src={task.starred ? Star2 : Star} alt="star" onClick={() => handleStarTask(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React,{useState} from 'react'
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import Draggable from 'react-draggable';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 330,
      minHeight:24
    },
    selectEmpty: {
      marginTop: theme.spacing(6),
    },
    table: {
      minWidth: 650,
      
    },
  }));
  function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }
export default function Car() {
  const classes = useStyles();

    let [data,setdata]=useState([])
    let [owner, setowner] = useState("")
    let [search, setsearch] = useState("")
    let [open, setopen] = useState(false)
    let [id, setid] = useState(0)
    let [car, setcar] = useState("")
    let [licence, setlicence] = useState("")
    let [date1,setdate1]=useState("")
    let [date2,setdate2]=useState("")
    let [yes, setyes] = useState(false);

    const handleClickOpen = (id) => {
      setid(id)
      setopen(true);
    };
    
  
    const handleClose = () => {
      setopen(false);
    };
const addcar=(e)=>{
    e.preventDefault()
    if(date1<=date2){
      let result={ id:data.length+1,owner,car,licence,date1,date2}
      setdata([...data,result])
    }else{
      alert("enter valid date!!")
    }
    
    setowner("")
    setcar("")
    setlicence("")
    setdate1("")
    setdate2("")
}
function remove(id){
    const result=data.filter((e)=>e.id!==id)
    setdata(result)
 }
 const handleyes=()=>{
  setyes(true)
  
    remove(id)  
     setyes(false)
}
    return (
        <div style={{backgroundColor:"#ebf19c",padding:"50px"}}>
          <h3 style={{marginLeft:"550px",padding:"20px"}}><LocalTaxiIcon color="primary" style={{ fontSize: 40 }}/>Car Parking</h3>
         <form  style={{marginLeft:"450px",border:"1px solid black",display:"inline-block" }}>
         <p style={{marginLeft:"50px"}}>Owner</p>
        <Input type="text" style={{marginLeft:"50px"}} value={owner} onChange={(e)=>setowner(e.target.value)}/>

         <p style={{marginLeft:"50px"}}>Car</p>
        <Input type="text" style={{marginLeft:"50px"}}value={car} onChange={(e)=>setcar(e.target.value)} />

         <p style={{marginLeft:"50px"}}>Licence Plate</p>
        <Input style={{marginLeft:"50px"}} type="text" value={licence} onChange={(e)=>setlicence(e.target.value)}/>

        <p style={{marginLeft:"50px"}}>EntryDate</p>
        <Input style={{marginLeft:"50px"}}type="date" value={date1} onChange={(e)=>setdate1(e.target.value)}/>

         <p style={{marginLeft:"50px"}}>ExitDate</p>
        <Input style={{marginLeft:"50px",marginBottom:"20px"}}type="date" value={date2} onChange={(e)=>setdate2(e.target.value)}/>

        <Button style={{marginLeft:"50px",marginTop:"10px"}}variant="contained" color="primary" onClick={(e)=>{addcar(e)}}>
            Add Car
           </Button>
         </form>
         <div>
             <div>
             <label style={{ fontFamily: "cursive" }}>Search :</label>
        <input
          type="text"
          id="search-input"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
             </div>
         <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" variant='dark'>
        <TableHead style={{fontSize:"30px"}}>
          <TableRow >
            <TableCell id="table-data" align="right">SNO</TableCell>
            <TableCell id="table-data" align="right">Owner</TableCell>
            <TableCell id="table-data" align="right">Car</TableCell>
            <TableCell id="table-data" align="right">Licence</TableCell>
            <TableCell id="table-data"  align="right">EntryDate</TableCell>
            <TableCell  id="table-data" align="right">Exit Date</TableCell>
            <TableCell id="table-data" align="right">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.filter((ele) => {
          if (search === "") {
            return ele;
          } else if (ele.owner.toLowerCase().includes(search.toLowerCase())) {
            return ele;
          } else if (
            ele.car.toLowerCase().includes(search.toLowerCase())
          ) {
            return ele;
          } 
        }).map((ele,i) => (
            <TableRow key={ele.i}>

              <TableCell align="right">
                {ele.id}
              </TableCell>
              <TableCell align="right">{ele.owner}</TableCell>
              <TableCell align="right">{ele.car}</TableCell>
              <TableCell align="right">{ele.licence}</TableCell>
              <TableCell align="right">{ele.date1}</TableCell>
              <TableCell align="right">{ele.date2}</TableCell>
              <TableCell align="right" onClick={() =>{(yes)?remove(ele.id):handleClickOpen(ele.id)}}><DeleteIcon style={{color:"red"}}/> </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         </div>
         <div>
         <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Are you sure you want to delete ?
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={()=>{handleyes();handleClose()}} color="primary">
            Yes
           </Button>
         </DialogActions>

        </Dialog>
         </div>
        </div>
    )
}

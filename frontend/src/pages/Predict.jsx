import background from '../Assets/images/background1.jpg'
import * as React from 'react';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Cookies from 'js-cookie'
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { CreateCustomer } from '../Utils/CustomerRequest';
import Typography from '@mui/material/Typography';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TextField from '@mui/material/TextField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {  Button as Bt, Tooltip, Table ,ConfigProvider,Tag,FloatButton} from 'antd';
import { GetItems } from '../Utils/AuthRequest';
const steps = ['About', 'Options', 'Form/History'];
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
export default function Predict(){
    const columns = [
        {
          title: 'Company',
          dataIndex: 'Company',
          key: 'Company',
          width: '15%',
          render: (_, { Company }) => (
            <>
            
                  <span style={{ color: "#4E4FEB", fontWeight: "600" }}>
                {Company}
              </span>
            </>
          ),
        },
        {
          title: 'Num Sites',
          dataIndex: 'Num_Sites',
          key: 'Num_Sites',
          width: '15%',
          render: (_, record) => (
            <Tag style={{color:"#4E4FEB"}} key={record.Num_Sites}>
            {record.Num_Sites}
          </Tag>
            )
        },
        {
          title: 'Total Purchase',
          dataIndex: 'Total_Purchase',
          key: 'Total_Purchase',
          width: '15%',
          render: (_, record) => (
           
              <span style={{ color: "#32cd32", fontWeight: "600" }}>
              {record.Total_Purchase}
            </span>
            
            )
        },
        {
          title: 'Account Manager',
          dataIndex: 'Account_Manager',
          key: 'Account_Manager',
          width: '20%',
          render: (_, record) => (
                        <span style={{ color: "#FFA07A", fontWeight: "600" }}>
                        {record.Account_Manager===1?<>Exist</>:<>Not exist</>}
                      </span>
                     
            )
        },
        {
            title: 'Years',
            dataIndex: 'Years',
            key: 'Years',
            width: '20%',
            render: (_, record) => (
                          <span style={{ color: "#FFA07A", fontWeight: "600" }}>
                          {record.Years}
                        </span>
                       
              )
          },
        {
          title: 'Chrun',
          dataIndex: 'Chrun',
          key: 'Chrun',
          width: '15%',
          render: (_, record) => (
            <Tag color="magenta" key={record.Chrun}>
            {record.Chrun===1?<>True</>:<>False</>}
          </Tag>
            )
        },
    
      ];
    const [Names, setNames] = React.useState('');
    const [Age, setAge] = React.useState('');
    const [Total_Purchase, setTotal_Purchase] = React.useState('');
    const [Account_Manager, setAccountManager] = React.useState('');
    const [Years, setYears] = React.useState('');
    const [OnboardDate, setOnboardDate] = React.useState('');
    const [Num_Sites, setNumSites] = React.useState('');
    const [Location, setLocation] = React.useState('');
    const [Company, setCompany] = React.useState('');
    const [data,setData]=React.useState([])
    const [Chrun, setChrun] = React.useState('');
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [isChecked1, setChecked1] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {

      }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleCloseD2 = () => {
    setOpenD(false);
  setNames('');
  setAge('');
 setTotal_Purchase('');
 setAccountManager('');
 setYears('');
 setOnboardDate('');
setNumSites('');
 setLocation('');
   setCompany('');
  setChrun('');
  setIsSwitchOn(false);
  setSelectedDate(null)
  }
    const handleCheckboxChange = (checkboxNumber) => {
      if (checkboxNumber === 1) {
        setChecked1(true);
        setChecked2(false);
      } else {
        setChecked1(false);
        setChecked2(true);
      }
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 0;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
if(activeStep===1 && isChecked2===true){        handleOpen()
    GetItems(Cookies.get("email")).then((res) => {
        handleClose()
        setData(res.data)
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
        
    })}
    };

    const predict =()=>{
        let val = 0
        if (isSwitchOn){
          val=1
        }
        const month=selectedDate.$M+1
        const date= selectedDate.$y+"-"+month+"-"+selectedDate.$D+" "+selectedDate.$H+":"+selectedDate.$m+":"+selectedDate.$s
        console.log(typeof(Num_Sites))
        const obj={
          email:Cookies.get("email"),
          Names:Names, 
          Age:parseFloat(Age), 
          Total_Purchase:parseFloat(Total_Purchase), 
          Account_Manager:val, 
          Years:parseFloat(Years),  
          Num_Sites:parseFloat(Num_Sites), 
          Location:Location, 
          Company:Company, 
          Onboard_date:date
        }
        console.log(obj)
        handleOpen()
        CreateCustomer(obj).then((res) => {
            handleClose()
            console.log(res.data)
            setChrun(res.data.Chrun)
            handleClickOpenD()
        }).catch((err) => {
            console.log(err)
            
        })
      
    
      
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [selectedDate, setSelectedDate] = React.useState(null);

    // Event handler for when the date and time are selected
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
return (<>   

<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </Backdrop>
<div style={{width:"100%",height:"100%",backgroundColor:"rgb(248, 249, 250)",position:"relative"}}>

<Box sx={{ width: '80%' ,position:"absolute",top:"55%",left:"50%",transform:"translate(-50%,-50%)"}}>
<p className='titlePredict'>Project-Predicting Churning Customers</p>
<p className='textPredict'>This project aims to identify the churn generation of customers.</p>
      <Stepper sx={{ width: '60%',margin:"0 auto"}} activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length +1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            <Box className="step">
                {activeStep===0&&<div className='divAbout'>
                    <p className='about'>
                    A marketing agency has many clients who use its service to produce advertisements for the client / client sites. They noticed that they have a high turnover of customers. They basically assign account managers at random now, <span style={{color: "rgb(58, 65, 111)",fontWeight:"600"}}>but they need a machine learning model that will help predict which customers will abandon (stop buying their service) </span>so they can correctly assign the customers at greatest risk to dismiss an account manager.
                    </p></div>}
                    {activeStep===1&&<div className='divAbout'>
                    <p className='textOptions'>
                    Choose between 2 options (checkboxes)
                    </p>
                    <Box style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                    <div class="checkbox-wrapper-16" style={{marginRight:"3vw"}}>
  <label class="checkbox-wrapper">
    <input type="checkbox" class="checkbox-input" checked={isChecked1}
          onChange={() => handleCheckboxChange(1)}
/>
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <ApartmentIcon />
 
      </span>
      <span class="checkbox-label">Predict</span>
    </span>
  </label>
</div>
                    <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input type="checkbox" class="checkbox-input"       checked={isChecked2}
          onChange={() => handleCheckboxChange(2)}/>
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <EventNoteIcon />
      </span>
      <span class="checkbox-label">Logs</span>
    </span>
  </label>
</div>
                    </Box>
                    </div>}
                {activeStep===2&&<>{isChecked1?<Box style={{position:"absolute",width:"80%",top:"45%",left:"50%",transform:"translate(-50%,-50%)"}}>
                    <p className='textOptions' style={{marginBottom:"3vh"}}>
                    New Customer
                    </p>
                <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"3vh"}}>
                    <TextField id="standard-basic" value={Names} label="Name" variant="filled" onChange={(event) => {setNames(event.target.value);}}/>
                    <TextField id="standard-basic" value={Age} label="Age" type="number" onChange={(event) => {setAge(event.target.value);}} variant="filled" />
                    <TextField id="standard-basic" value={Total_Purchase} label="Total Purshase" type="number"onChange={(event) => {setTotal_Purchase(event.target.value);}} variant="filled" />
                    </Box>
                    <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"3vh"}}>
                    <TextField id="standard-basic" value={Company} label="Company"  onChange={(event) => {setCompany(event.target.value);}}variant="filled" />
                    <TextField id="standard-basic" value={Num_Sites} label="Number Of sites" onChange={(event) => {setNumSites(event.target.value);}}type="number" variant="filled" />
                    <TextField id="standard-basic" value={Years} label="Years" type="number" onChange={(event) => {setYears(event.target.value);}}variant="filled" />
                    </Box>
                    <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"3vh"}}>
                    {/* <TextField id="standard-basic" style={{width:"50%",marginRight:"3vw"}} label="Onboard_date" variant="filled" /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{width:"50%"}}>
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          label="With Time Clock"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />

      </DemoContainer>
    </LocalizationProvider>
                    <TextField id="standard-basic" value={Location}  label="Location" onChange={(event) => {setLocation(event.target.value);}} variant="filled" style={{width:"58%"}}/>
                    </Box>
                    <Box style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  <FormControlLabel control={<Switch checked={isSwitchOn} onChange={(event) => {setIsSwitchOn(event.target.checked);}} defaultChecked />} label="Account Manager" />
  </Box>
                </Box>:<ConfigProvider
  theme={{
    components: {
      Table: {
        headerBg:"#4E4FEB",
        headerColor:"white",
      },
    },
  }}
>
<Table columns={columns} dataSource={data} size="middle" style={{margin:"3vh 0"}} bordered />
</ConfigProvider>}</>}
          <Box > 
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained" className='buttonBack'
              style={{position:"absolute",bottom:"3vh",left:"3vh"}}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
 
{isChecked1&&activeStep === steps.length - 1 ?
            <Button variant="contained" className='buttonNext' onClick={predict}style={{position:"absolute",bottom:"3vh",right:"3vh"}}>
              Predict
            </Button>:
                  <></>}
                  {activeStep !== steps.length - 1 ?
            <Button variant="contained" className='buttonNext' onClick={handleNext}style={{position:"absolute",bottom:"3vh",right:"3vh"}}>
              Next
            </Button>:
                  <></>}
          </Box>
          </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
</div>
<React.Fragment>
      <BootstrapDialog
        onClose={handleCloseD}
        aria-labelledby="customized-dialog-title"
        open={openD}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" >
            <p className='textOptions' style={{marginBottom:"0"}}>Result</p>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseD}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box style={{display:"flex",justifyContent:"center",margin:"2vh 0"}}>
        {Chrun===1?<SentimentVeryDissatisfiedIcon sx={{ fontSize: 80,color:"red", }}/>:<SentimentSatisfiedAltIcon  sx={{ fontSize: 80,color:"green", }}/>}
        </Box>
          <Typography gutterBottom>
          {Chrun===1?<p className='about'> customer <span style={{color:"rgb(25, 118, 210)"}}>{Names}</span> is at risk of churning from our services, we need to take action.</p>:
          <p className='about'>customer <span style={{color:"rgb(25, 118, 210)"}}>{Names}</span> will not churn from our services...</p>}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseD2}>
            OK, Thanks
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
</> 
)
}

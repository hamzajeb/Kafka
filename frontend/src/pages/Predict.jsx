import background from '../Assets/images/background1.jpg'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
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

const steps = ['About', 'Options', 'Form/History'];
export default function Predict(){
    const [isChecked1, setChecked1] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(false);
  
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
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
      {activeStep === steps.length ? (
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
                    <TextField id="standard-basic" label="Name" variant="filled" />
                    <TextField id="standard-basic" label="Age" type="number" variant="filled" />
                    <TextField id="standard-basic" label="Total Purshase" type="number" variant="filled" />
                    </Box>
                    <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"3vh"}}>
                    <TextField id="standard-basic" label="Company"  variant="filled" />
                    <TextField id="standard-basic" label="Number Of sites" type="number" variant="filled" />
                    <TextField id="standard-basic" label="Years" type="number" variant="filled" />
                    </Box>
                    <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"3vh"}}>
                    {/* <TextField id="standard-basic" style={{width:"50%",marginRight:"3vw"}} label="Onboard_date" variant="filled" /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{width:"30%"}}>
      <DemoContainer
        components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
      >
        <DemoItem>
          <DateTimePicker
            views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
                    <TextField id="standard-basic"  label="Location" variant="filled" />
                    <Box style={{display:"flex",alignItems:"center"}}>
  <FormControlLabel control={<Switch defaultChecked />} label="Account Manager" />
  </Box>
                    </Box>
                </Box>:<>historique</>}</>}
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
 

            <Button variant="contained" className='buttonNext' onClick={handleNext}style={{position:"absolute",bottom:"3vh",right:"3vh"}}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
          </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
</div>
</> 
)
}

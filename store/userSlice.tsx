import { createSlice } from '@reduxjs/toolkit';


//copied shamelessly from chatGPT; update with actual user fields
const initialState = {
    userId: '',
    firstName: '',
    middleName: '',
    lastName: '',
	accountType: '',
	DOB: '',       
	Location: '',    
	Pronouns: '' ,  
	Orientation: '', 
	Race1: '',       
	Race2: '',       
	Ethnicity: '',   
	Religion: '',   
	Politics: '',    
	Family: '',     
	FamilyPlans: '', 
	LookingFor: '',  
	AboutMe: ''    
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserMiddleName(state, action) {
        state.middleName = action.payload;
    },
    setUserLastName(state, action) {
        state.lastName = action.payload;
    },
    setUserLocation(state, action) {
      state.Location = action.payload;
    },
    setUser(state, action) {
        state.userId = action.payload.userId;
        state.firstName = action.payload.firstName
        state.middleName = action.payload.middleName;
        state.lastName = action.payload.lastName;
        state.accountType = action.payload.accountType;
        state.DOB = action.payload.DOB;
        state.Location = action.payload.Location
        state.Pronouns = action.payload.Pronouns 
        state.Orientation = action.payload.Orientation
        state.Race1 = action.payload.Race1    
        state.Race2 = action.payload.Race2       
        state.Ethnicity = action.payload.Ethnicity   
        state.Religion = action.payload.Religion  
        state.Politics = action.payload.Politics   
        state.Family = action.payload.Family    
        state.FamilyPlans = action.payload.FamilyPlans 
        state.LookingFor = action.payload.LookingFor  
        state.AboutMe = action.payload.AboutMe
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

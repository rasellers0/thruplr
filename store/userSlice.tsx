import { createSlice } from '@reduxjs/toolkit';


//copied shamelessly from chatGPT; update with actual user fields
const initialState = {
    value: {
      UserId: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      AccountType: '',
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
    }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFirstName(state, action) {
      state.value.FirstName = action.payload;
    },
    setUserMiddleName(state, action) {
        state.value.MiddleName = action.payload;
    },
    setUserLastName(state, action) {
        state.value.LastName = action.payload;
    },
    setUserLocation(state, action) {
      state.value.Location = action.payload;
    },
    setUser(state, action) {
        state.value.UserId = action.payload.UserId;
        state.value.FirstName = action.payload.FirstName
        state.value.MiddleName = action.payload.MiddleName;
        state.value.LastName = action.payload.LastName;
        state.value.AccountType = action.payload.AccountType;
        state.value.DOB = action.payload.DOB;
        state.value.Location = action.payload.Location
        state.value.Pronouns = action.payload.Pronouns 
        state.value.Orientation = action.payload.Orientation
        state.value.Race1 = action.payload.Race1    
        state.value.Race2 = action.payload.Race2       
        state.value.Ethnicity = action.payload.Ethnicity   
        state.value.Religion = action.payload.Religion  
        state.value.Politics = action.payload.Politics   
        state.value.Family = action.payload.Family    
        state.value.FamilyPlans = action.payload.FamilyPlans 
        state.value.LookingFor = action.payload.LookingFor  
        state.value.AboutMe = action.payload.AboutMe
    }
  }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state:any) => state.user.value;

export default userSlice.reducer;

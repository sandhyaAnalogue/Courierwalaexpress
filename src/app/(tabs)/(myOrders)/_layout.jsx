import { Stack } from 'expo-router';

export default function OrderDetailsLayout() {
  return (
    <Stack screenOptions={{headerShown:true,
     
        // headerStyle: {
        //   backgroundColor: 'transparent', 
        //   elevation: 0,                 
        //   borderBottomWidth: 0,          
        // },
           
         
  
    }}>

      <Stack.Screen name='index' />
       
    </Stack>
  );
}
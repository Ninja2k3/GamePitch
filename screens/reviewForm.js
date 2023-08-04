import { StyleSheet,Button,TextInput,View,Text } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from 'yup';
import FlatButton from "./button";
const ReviewSchema = yup.object({
    title: yup.string()
    .required()
    .min(4),
    
    body: yup.string()
    .required()
    .min(10),

    rating:yup.string()
    .required()
    .test('is-num-1-5', 'Rating must be a number between 1 to 5', (val)=>{
        return parseInt(val)<6 && parseInt(val)>0
    })
})

export default function ReviewForm({addReview}){
    return(
        
        <View style={globalStyles.container}>
        <Formik
        initialValues={{ title: '',body: '',rating: '' }}
        validationSchema={ReviewSchema}
        onSubmit={values => addReview(values)}
   >
     {({ touched,handleChange,handleBlur, handleSubmit, values,errors }) => (
       <View>
         <TextInput
           onChangeText={handleChange('title')}
           value={values.title}
           style={globalStyles.input}
           placeholder="Player Name"
           onBlur={handleBlur('title')}
         />
        <Text style={globalStyles.errorText}>{touched.title&&errors.title}</Text>
        <TextInput
           onChangeText={handleChange('body')}
           multiline minHeight={60}
           value={values.body}
           style={globalStyles.input}
           placeholder="Review"
           onBlur={handleBlur('body')}
         />
        <Text style={globalStyles.errorText}>{touched.body&&errors.body}</Text>

        <TextInput
           onChangeText={handleChange('rating')}
           value={values.rating}
           style={globalStyles.input} 
           placeholder="Rating(1-5)"
           keyboardType='numeric' 
           onBlur={handleBlur('rating')}
            
            />
        <Text style={globalStyles.errorText}>{touched.rating&&errors.rating}</Text>

         <FlatButton onPress={handleSubmit} text='submit' />
       </View>
     )}
   </Formik>
        </View>
    )
}
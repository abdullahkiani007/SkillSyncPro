import {object,string} from 'yup';



let jobPostSchema = object({
    title: string().min(5).required(),
    description: string().required(),
    requirements: string().required(),
    company: string().required(),
    location: string().required(),
    salaryRange: string().required(),
    employmentType: string().required(),
})

export default jobPostSchema;

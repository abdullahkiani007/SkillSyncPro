

const CvService = {

    async uploadCv(cv) {
        const formData = new FormData();
        formData.append('cv', cv);

        try {
            const response = await fetch('/api/upload-cv', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error uploading CV:', error);
        }
    }
    
    ,
    async tailorResume(jobDescription, resume) {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('resume', resume);

        try {
            const response = await fetch('/api/tailor-resume', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error tailoring resume:', error);
        }
    },
}
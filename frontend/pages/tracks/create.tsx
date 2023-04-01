import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Create = () => {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState<number>(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    const next = () => {
        if (activeStep === 2) {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture!)
            formData.append('audio', audio!)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
        setActiveStep((prev) => prev + 1)

    }
    const back = () => {
        if (activeStep === 0) return
        setActiveStep((prev) => prev - 1)
    }
    return (
        <MainLayout>
            <>
                <StepWrapper activeStep={activeStep}>
                    <>
                        {activeStep === 0 &&
                            <Grid container direction={"column"} style={{ padding: 20 }}>
                                <TextField
                                    {...name}
                                    style={{ marginTop: '10px' }}
                                    label={"Название трека"}
                                />
                                <TextField
                                    {...artist}
                                    style={{ marginTop: '10px' }}
                                    label={"Имя исполнителя"}
                                />
                                <TextField
                                    {...text}
                                    style={{ marginTop: '10px' }}
                                    label={"Слова к треку"}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        }
                        {activeStep === 1 && <FileUpload setFile={setPicture} accept="image/*">
                            <>
                                {picture && <p>DONE !</p>}
                                <Button variant="outlined">Загрузить обложку</Button>
                            </>

                        </FileUpload>}
                        {activeStep === 2 && <FileUpload setFile={setAudio} accept="audio/*">
                            <Button variant="outlined">Загрузить аудио</Button>
                        </FileUpload>}
                    </>
                </StepWrapper>
                <Grid container justifyContent={'space-between'}>
                    <Button onClick={back}>Назад</Button>
                    <Button onClick={next}>Вперед</Button>
                </Grid>
            </>
        </MainLayout>
    )
}
export default Create;
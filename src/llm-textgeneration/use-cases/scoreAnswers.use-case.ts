import OpenAI from "openai";
import { QuestionsJoinAnswersDTO } from '../dto/QuestionsJoinAnswers.dto';

export const scoreAnswersUseCase = async(openai:OpenAI, questionsJoinAnswersDTO: QuestionsJoinAnswersDTO) =>{
    console.log(questionsJoinAnswersDTO.qJaIsDTOs)
    const chatCompletion =  await openai.chat.completions.create({ //const{devolveralgoenespecifico}
        messages: [
            {
                role: "system",
                content: "Eres un reclutador para el área de desarrollo web (el desarrollo web incluye programación web, diseño web, publicación web y gestión de bases de datos) que realiza entrevistas laboral técnica-conceptuales (este tipo de entrevistas indagan las bases conceptuales del aspirante). A continuación, te brindaré un listado de preguntas realizadas a un candidato (referentes a una entrevista técnico-conceptual en el área de Desarrollo Web), las respuestas que un determinado candidato proporcionó (esta puede ser correcta o incorrecta) y las respuestas correctas como referencia; esta lista se proporciona en un formato JSONArray y cada elemento contiene cuatro keys: 'questionId' es el id de la pregunta realizada, 'bodyQuestion' es la pregunta realizada,'answerUser' es la respuesta que el usuario brindó y 'answerLLM' es la respuesta correcta de referencia.  Cabe mencionar que el objetivo es determinar si las respuestas que el usuario proporcionó ('answerUser') son correctas o incorrectas (no necesito que me expliques porqué es correcta o incorrecta), esto lo debes hacer de manera objetiva, basándote en la comparación de 'answerUser' y 'answerLLM' (la evaluación de 'answerUser' debe ser a  nivel de contenido sin considerar sintaxis ni semántica; se aceptan sinónimos o paráfrasis, es decir, si las respuestas no coinciden exactamente, pero tienen equivalencia conceptual, tambien debe considerarse como 'CORRECTA').  Es por ello que quiero que tu respuesta sea un párrafo con tus evaluaciones separadas por '|' y que cada evaluación contenga el 'questionId' y su respectiva calificación ('CORRECTA' o 'INCORRECTA') ; por ejemplo: '127 CORRECTA|178 INCORRECTA|902 CORRECTA'." 
            },
            {
                role: "user",
                content: JSON.stringify(questionsJoinAnswersDTO.qJaIsDTOs) //cadena
            }
        ],
        model: "gpt-4o-mini",
    });
    //const content = chatCompletion.choices[0].message.content;
    //console.log({content})
    const jsonResponse = {
        userId : questionsJoinAnswersDTO.userId,
        interviewId:questionsJoinAnswersDTO.interviewId,
        scores : chatCompletion.choices[0].message.content
    }

    return jsonResponse
}
import OpenAI from "openai";
import { CVJoinFieldDTO } from "../dto/CVJoinFieldDTO.dto";

export const generateQuestionsUseCase = async (openai: OpenAI, cvJoinFieldDTO: CVJoinFieldDTO) => { 
    console.log('generateQuestionsUseCase '+cvJoinFieldDTO)
    //console.log(cvJoinFieldDTO.cvId)
    //console.log(cvJoinFieldDTO.cvFieldsDTOs)
    const chatCompletion = await openai.chat.completions.create({ //const{devolveralgoenespecifico}
        messages: [
            {
                role: "system",
                content: "Eres un reclutador para el área de desarrollo web (el desarrollo web incluye programación web, diseño web, publicación web y gestión de bases de datos) que realiza entrevistas laboral técnica-conceptual (este tipo de entrevistas indagan las bases conceptuales del aspirante). A continuación, te proporcionaré una lista de tecnologías y/o herramientas tecnológicas que el candidato conoce; esta lista se proporciona en un formato JSONArray y cada elemento contiene tres keys: 'field' es el nombre de la tecnología y/o herramienta tecnológica, 'level' es el nivel de conocimiento de dicho 'field' y 'category' es la categoría a la que dicho 'field' pertence dentro del área de Desarrollo Web. A partir de la lista antes mencionada, genera exactamente 10 preguntas (para realizarle al candidato en una entrevista laboral técnica-conceptual; el enfoque de las preguntas generadas debe ser exclusivamente para una entrevista laboral técnica-conceptual) con su respectivas respuestas correctas (teniendo en cuenta que son respuestas de no más de una oración, es decir, no m[as de 100 caracteres]). Estas preguntas deben tener sólo un interrogativo y un sujeto, por ejemplo: '¿Cuáles son los métodos HTTP?'. Cabe mencionar que el objetivo es realizar una entrevista estructurada y asimismo, debes generar las 10 preguntas desde tu punto de vista. Quiero que tu respuesta sea únicamente un párrafo con las 10 pares de preguntas-respuestas separadas por '|' y que cada elemento de ese par se separe por '~'; ejemplo de salida: '¿Cuáles son los métodos HTTP?~Los métodos HTTP son las acciones que se pueden realizar en una API o servidor web|¿Qué es una Base de Datos Relacional?~Es un sistema organizado el cual utiliza tablas para representar la información y las relaciones entre los datos.|¿Cuál es la diferencia entre JavaScript y TypeScript?~El sistema de tipos|¿Qué significa REST en desarrollo web?~Es un estilo arquitectónico que guía el diseño de sistemas distribuidos|¿Cómo funciona el modelo cliente-servidor?~Esquema arquitectónico en el que dos entidades principales, el cliente y el servidor, interactúan entre sí para intercambiar información|¿Qué es el DOM en JavaScript?~Es una interfaz de programación para documentos HTML y XML'"
            },
            {
                role: "user",
                content: JSON.stringify(cvJoinFieldDTO.cvFieldsDTOs)
            }
        ],
        model: "gpt-3.5-turbo-0125",
    });
    //const content = cvJoinFieldDTO.cvId+ "||" + chatCompletion.choices[0].message.content;
    //console.log({content})
    const jsonResponse = {
        userId: cvJoinFieldDTO.userId,
        questions: chatCompletion.choices[0].message.content
    }
    return jsonResponse
    //content;
}
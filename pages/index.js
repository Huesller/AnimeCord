import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";
import React from 'react'
import { useRouter } from 'next/router';


function Titulo(props) {
  const Tag = props.tag || "h1";

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["900"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  
  const [username, setUsername] = React.useState('');
  
  const roteamento = useRouter();
  
  const imagemError = 'https://stickers.wiki/static/stickers/anpasa/file_63224.webp?ezimgfmt=rs:95x95/rscb1/ng:webp/ngcb1';
  
  const [dados, setDados] = React.useState([]);

  return (
    <>
      
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals["300"],
          backgroundImage: "url(https://media.giphy.com/media/cpkQpkVFOOoNi/giphy.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",                   
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            padding: "32px",
            margin: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            border: "1px solid rgba(0, 0, 0, 0.88)",
            borderColor: appConfig.theme.colors.neutrals[999],
            borderRadius: "130px 0px 130px 0px",
            flex: 1,
            minHeight: "240px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(3.6px)",
            webkitBackdropFilter: "blur(2.6px)",
            boxShadow: ' 0 0 1em rgb( 523, 14, 12)',            
          }}
        >
          {/* Formulário */}
          <Box
           as="form"
           onSubmit={function (infosDoEvento) {
             infosDoEvento.preventDefault();
             roteamento.push('/chat')
           }}
           styleSheet={{
             display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
             width: { xs: '100%', sm: '50%' },
             textAlign: 'center',
             marginBottom: '32px',
           }}
          >
            <Titulo tag="h1">Bem vindos Animaniacos!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                fontFamily: 'Bold Serif',
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals["050"],
                fontWeight: "bold",
              }}
            >
              {appConfig.name} ({username})
            </Text>
            <TextField
            placeholder='Digite o seu usuario do GitHub...'
            value={username}
            onChange={function (event) {              
              const valor = event.target.value;              
              setUsername(valor);
              fetch(`https://api.github.com/users/${valor}`)
              .then(response => response.json())
              .then(data => {
                setDados(data)
              })
            }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[900],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              boxShadow: ' 0 0 1em rgb( 523, 14, 12)',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "20px 85px ",
              flex: 1,
              minHeight: '240px',
            }}
          >
            
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={username.length > 2 && username.length !== null && username.trim() ? `https://github.com/${username}.png` : imagemError}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
                fontSize: '15px',
                marginBottom: '10px'

              }}
            >
              {username.length > 2 && username.length !== null && username.trim() ? username : "O campo está vazio!"}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {dados.name}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {dados.location}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
               margin:'5px', borderBottom: 'solid 1px grey',
               color: appConfig.theme.colors.neutrals[300]
              }}
            >
             Followers: {dados.followers}
            </Text>
            <a
              target="_blank"
              variant="body4"
              style={{
                border: 'solid 1px grey',
                padding: '0px 5px',
                borderRadius: '15px', 
                textDecoration: 'none', 
                color: appConfig.theme.colors.neutrals[300], 
                fontSize: '20px', 
                cursor: 'pointer'
              }}
              href={dados.html_url}>
              Ir para o GitHub
            </a>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
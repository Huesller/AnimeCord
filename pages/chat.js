import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const username = roteamento.query.user;

    function handleNovaMensagem(novaMensagem) {
        const mensagemComposta = {
            id: listaDeMensagens.length + 1,
            de: username,
            texto: novaMensagem,
        };

        if (novaMensagem.length !== null && novaMensagem.trim()) {
            setListaDeMensagens([
                mensagemComposta,
                ...listaDeMensagens,
            ]);
        }
        setMensagem('');
    }


    function handleDeleteMessage(event) {
        const messageId = Number(event.target.dataset.id)
        const listaDeMensagemFiltrada = listaDeMensagens.filter((messageFiltered) => {
            return messageFiltered.id != messageId
        })


        setListaDeMensagens(listaDeMensagemFiltrada)
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url("https://images2.alphacoders.com/221/221620.jpg")`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: ' 0 0 1em ',
                    borderRadius: '5px',
                    backgroundColor: "rgba(0, 0, 0, 0.33)",
                    height: '100%',
                    maxWidth: '55%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        boxShadow: ' 0 0 1em ',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',

                    }}
                >
                    <MessageList mensagens={listaDeMensagens} deleteMessage={handleDeleteMessage} />
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                fontSize: '18px'
                            }}
                        />
                        <Button
                            label='Enviar'
                            styleSheet={{
                                height: '60px',
                                borderRadius: '20%',
                                hover: {
                                    boxShadow: ' 0 0 2em rgb( 523, 14, 12)',
                                }
                            }}
                            buttonColors={{
                                contrastColor: 'rgb( 523, 14, 12)',
                                mainColor: appConfig.theme.colors.primary["000"],
                                mainColorLight: appConfig.theme.colors.neutrals[800],
                                mainColorStrong: appConfig.theme.colors.neutrals[800],
                            }}
                            onClick={() => handleNovaMensagem(mensagem)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text
                    variant='heading5'
                    styleSheet={{
                        color: '#white'
                    }}
                >
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    label='Sair do chat'
                    href="/"
                    styleSheet={{
                        color: 'rgb( 523, 14, 12)',
                        hover: {
                            boxShadow: ' 0 0 2em rgb( 523, 14, 12)',
                        }
                    }}
                    buttonColors={{
                        contrastColor: 'rgb( 523, 14, 12)',
                        mainColor: appConfig.theme.colors.primary["000"],
                        mainColorLight: appConfig.theme.colors.neutrals[800],
                        mainColorStrong: appConfig.theme.colors.neutrals[800],
                    }}

                />
            </Box>
        </>
    )
}

function MessageList(props) {
 
    const handleDeleteMessage = props.deleteMessage
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/username.png`}
                            />
                            <Text
                                tag="strong"
                            >
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Text
                                onClick={handleDeleteMessage}
                                styleSheet={{
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    marginLeft: 'auto',
                                    color: 'rgb( 523, 14, 12)',
                                    backgroundColor: '#fff',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[800],
                                        boxShadow: ' 0 0 2em rgb( 523, 14, 12)',
                                    }
                                }}
                                tag="span"
                                data-id={mensagem.id}
                            >
                                X
                            </Text>
                        </Box>
                        <Text
                            styleSheet={{
                                borderBottom: '1px solid rgb( 523, 14, 12)',
                            }}>
                            {mensagem.texto}
                        </Text>

                    </Text>
                );
            })}
        </Box>
    )
}
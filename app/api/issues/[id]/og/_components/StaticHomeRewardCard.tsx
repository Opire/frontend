import { FC } from "react";
import { splitToShow } from "../../../../../_utils/splitToShow";
import { IssueListDTO } from "../../../../../_core/_dtos/IssueListDTO";
import { formatPrice } from "../../../../../_utils/formatPrice";

interface StaticHomeRewardCardProps {
    data: IssueListDTO;
}

const MAX_NUMBER_OF_PROGRAMMING_LANGUAGES_TO_SHOW = 4;

export const StaticHomeRewardCard: FC<StaticHomeRewardCardProps> = ({ data }) => {
    const [programmingLanguagesToShow] = splitToShow(
        data.programmingLanguages,
        MAX_NUMBER_OF_PROGRAMMING_LANGUAGES_TO_SHOW
    )

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#25262B',
            color: 'white',
            fontFamily: 'Roboto'
        }}>
            {/* Header container */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #373A40',
                    gap: '10px',
                }}
            >
                <img
                    height={44}
                    width={44}
                    src={`${process.env.NEXT_PUBLIC_URL}/icons/${data.platform.toLowerCase()}.png`}
                />
                <span style={{
                    color: 'white',
                }}>
                    {data.title}
                </span>
            </div>

            {/* Body container */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '80%'
                }}
            >
                {/* Body header */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                        }}
                    >
                        <img
                            height={44}
                            width={44}
                            src={data.organization.logoURL}
                            style={{ borderRadius: '8rem' }}
                        />

                        <div style={{
                            display: 'flex',
                            gap: '2px',
                            flexWrap: 'wrap',
                        }}>
                            <span>{data.organization.name}</span>
                            <span>/</span>
                            <span>{data.project.name}</span>
                        </div>
                    </div>

                    {/* Labels container */}
                    <div style={{
                        display: 'flex',
                        padding: '5px 10px',
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {programmingLanguagesToShow.map((programmingLanguage) => (
                                <span key={programmingLanguage} style={{
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '15px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    borderColor: '#41C9DB',
                                    color: '#41C9DB',
                                    fontFamily: 'Roboto-Bold',

                                }}>
                                    {programmingLanguage.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price container */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <p style={{
                        background: 'linear-gradient(45deg, #12B886 0%, #1098AD 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontSize: '4rem',
                        fontWeight: 700,
                        fontFamily: 'Roboto-Bold',
                        margin: 0
                    }}>
                        {formatPrice(data.pendingPrice)}
                    </p>
                </div>

                {/* Footer container */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginTop: '4rem',
                }}>
                    {/* <p style={{
                        fontSize: '0.8rem',
                        textAlign: 'end',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        margin: '0 1rem'
                    }}>
                        <span>Created</span>
                        <span>{getRelativeTime(new Date(data.createdAt))}</span>
                    </p> */}
                </div>

            </div>
        </div>
    );
};

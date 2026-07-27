interface Props {
    searches: string[];
    onLabelClicked: (term: string) => void;
}

export const PreviousSearchesComponent = ({ searches, onLabelClicked }: Props) => {
    return (
        <>
            < div className="previous-searches" >
                <h2>Busquedas previas</h2>
                <ul className="previous-searches-list">

                    {
                        searches.map((search) => (
                            <li key={search}
                                onClick={() => onLabelClicked(search)}
                            >{search}</li>
                        ))

                    }

                </ul>
            </div >
        </>
    )
}

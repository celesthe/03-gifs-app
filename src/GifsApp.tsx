import { GifListComponent } from './gifs/Components/GifListComponent'
import { PreviousSearchesComponent } from './gifs/Components/PreviousSearchesComponent'
import { CustomHeader } from './shared/components/CustomHeader'
import { CustomSearchBar } from './shared/components/CustomSearchBar'
import { useGifs } from './gifs/hooks/useGifs'




export const GifsApp = () => {

    const { gifs, previousSearches, handleTermClicked, handleSearch } = useGifs();

    return (
        <>
            {/* header */}

            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el gif perfecto"
            />

            {/* search */}

            <CustomSearchBar placeholder="Buscar gifs"
                onQuery={handleSearch}

            />

            {/* busquedas previas */}
            <PreviousSearchesComponent searches={previousSearches}
                onLabelClicked={handleTermClicked} />

            {/* gifs */}
            <GifListComponent gifs={gifs} />

        </>
    )
}

import { ITrack } from "@/types/track"
import { Box, Grid } from "@mui/material"
import TrackItem from "./TrackItem"
import { useTypedSelector } from "@/hooks/useTypedSelector"

interface ITrackListProps {
    tracks: ITrack[],
    deleteTrackFromList: (id: number) => void
}

const TrackList: React.FC<ITrackListProps> = ({ tracks, deleteTrackFromList }) => {
    const { active } = useTypedSelector(state => state.player)
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.length > 0 ? (tracks.map(track => <TrackItem key={track.id} track={track} deleteTrackFromList={deleteTrackFromList} />)) : (
                    <p style={{ textAlign: 'center' }}>Нету песень...</p>
                )}

            </Box>
        </Grid>
    )
}
export default TrackList
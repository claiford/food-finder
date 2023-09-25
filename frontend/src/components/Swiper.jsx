import { useState } from 'react';
import { Box, Button, MobileStepper, Card, CardContent, Typography, ImageList, ImageListItem } from '@mui/material'
// import Carousel from 'react-material-ui-carousel'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded';
import cryface from '../assets/cry-face.png'

const Swiper = ({ candidates, handleCompleteSwiping }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [votes, setVotes] = useState(Object.fromEntries(candidates.map((c) => [c.place_id, 0])));

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleNo = () => {
		handleNext()
	}

	const handleYes = () => {
		const currentCandidateID = candidates[activeStep].place_id;
		setVotes((prevVotes) => {
			return ({
				...prevVotes,
				[currentCandidateID]: 1,
			})
		})
		handleNext()
	}

	const candidateCards = candidates.map((candidate, i) => {
		return (
			<Card key={i} sx={{ width: '100%', boxShadow: 'none', backgroundColor: "darkgray.main" }}>
				{candidate.photos.length > 0 ? (
					<Box className="masonry" sx={{ height: 400, overflowY: 'scroll' }}>
						<ImageList variant="masonry" cols={2} gap={8}>
							{candidate.photos.map((photoURL, i) => (
								<ImageListItem key={i}>
									<img
										src={photoURL}
										// srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={`${candidate.name}-${i}`}
										loading="lazy"
									/>
								</ImageListItem>
							))}
						</ImageList>
					</Box>
				) : (
					<Box sx={{
						height: 400,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: "lightgray",
						borderRadius: 5,
					}}>
						<Typography variant="h6">
							no photos found
						</Typography>
						<img src={cryface} alt="none found" width='50%' />
					</Box>
				)}
				<CardContent>
					<Typography variant="header2" component="div" sx={{ mb: 2 }}>
						{candidate.name}
					</Typography>
					<Typography variant="body2">
						Rating: {candidate.rating ? candidate.rating + "⭐" : "-"}
					</Typography>
					<Typography variant="body2">
						Reviews: {candidate.user_ratings_total ?? "-"}
					</Typography>
					<Typography variant="body2">
						Open now: {candidate.is_open === null ? "-" : candidate.is_open ? "Yes" : "No"}
					</Typography>
				</CardContent>
			</Card>
		)
	})

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
			{activeStep === candidates.length ? (
				<>
					<HowToVoteRoundedIcon color="lime" sx={{fontSize: "150px"}} />
					<Button sx={{ mt: 4 }} onClick={() => handleCompleteSwiping(votes)}>Complete</Button>
				</>
			) : (
				<>
					{candidateCards[activeStep]}
					<div>
						<Button size="small" onClick={handleNo}>
							<KeyboardArrowLeft />
							NO
						</Button>
						<Button size="small" onClick={handleYes}>
							YES
							<KeyboardArrowRight />
						</Button>
					</div>
					<MobileStepper
						variant="dots"
						steps={candidates.length}
						position="static"
						activeStep={activeStep}
						sx={{ justifyContent: 'center', backgroundColor: "darkgray.main" }}
					/>
				</>
			)}
		</Box >
	);
}

export default Swiper;
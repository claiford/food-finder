import { useState } from 'react';
import { Box, Button, MobileStepper, Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Swiper = ({ candidates }) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleNo = () => {
		handleNext()
	}

	const handleYes = () => {
		handleNext()
	}

	const candidateCards = candidates.map((candidate) => {
		return (
			<Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
				<CardMedia
					sx={{ height: 140 }}
					image={candidate.photos[0]}
					title="photo-0"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{candidate.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Rating: {candidate.rating ? candidate.rating + "⭐" : "-"} 
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Reviews: {candidate.user_ratings_total ?? "-"}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Open now: {candidate.is_open === null ? "-" : candidate.is_open ? "Yes" : "No"}
					</Typography>
				</CardContent>
			</Card>
		)
	})

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>	
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
				sx={{ justifyContent: 'center' }}
			/>
		</Box>
	);
}

export default Swiper;
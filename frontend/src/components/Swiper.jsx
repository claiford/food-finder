import { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Button, MobileStepper, Alert, Rating, Card, CardContent, Typography, ImageList, ImageListItem, Chip } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import HowToVoteRoundedIcon from '@mui/icons-material/HowToVoteRounded';
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import cryface from '../assets/cry-face.png'
const images = require.context('../assets', true);

const Swiper = ({ candidates, handleCompleteSwiping }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [candidateCards, setCandidateCards] = useState([]);
	const [votes, setVotes] = useState(Object.fromEntries(candidates.map((c) => [c.place_id, 0])));

	const handleCheck = () => {
		console.log(votes);
		console.log()
	}

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleNo = () => {
		handleNext()
	}

	const handleYes = () => {
		const currentCandidateID = candidates[activeStep].place_id;
		console.log(votes);
		setVotes((prevVotes) => {
			return {
				...prevVotes,
				[currentCandidateID]: 1,
			}
		})
		handleNext()
	}

	const partnerQuery = async (place_id) => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/api/candidate/partnersearch/${place_id}`);
			const partner = res.data;
			return partner ?? null;
		} catch (err) {
			console.log(err);
		}
	}

	// constructCards used in useEffect because of async nature to do partnerQuery
	const constructCards = async () => {
		setCandidateCards(await Promise.all(candidates.map(async (candidate, i) => {
			const partner = await partnerQuery(candidate.place_id);
			if (partner) {
				candidate.name = partner.name;
				candidate.photos = partner.photos;
			}

			return (
				<Card key={i} sx={{ width: '100%', boxShadow: 'none', backgroundColor: "darkgray.main" }}>
					{candidate.photos?.length > 0 ? (
						<Box className="masonry" sx={{ height: 300, overflowY: 'scroll' }}>
							<ImageList variant="masonry" cols={2} gap={8}>
								{candidate.photos.map((photoURL, i) => (
									<ImageListItem key={i}>
										<img
											src={partner ? images(`${photoURL}`) : photoURL}
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
					<CardContent sx={{ px: 0, py: 3, minHeight: '170px' }}>
						<Box sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
							<Typography variant="header2">
								{candidate.name}
							</Typography>
							{partner &&
								<Chip
									size='small'
									color="primary"
									icon={<FaceRetouchingNaturalRoundedIcon />}
									label="Partner"
									sx={{
										fontWeight: 700
									}}
								/>
							}
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
							<Typography variant="body2" fontWeight={700} sx={{ mr: 1 }}>
								{candidate.rating ? candidate.rating : "-"}
							</Typography>
							<Rating
								readOnly
								precision={0.1}
								value={candidate.rating}
								icon={<StarRoundedIcon fontSize="inherit" color="lime" />}
								emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" color="lime" />}
							/>
							<Typography variant="body2" fontWeight={700} sx={{ mx: 1 }}>
								({candidate.user_ratings_total ?? "-"})
							</Typography>
						</Box>
						<Alert severity="info" sx={{ visibility: partner ? "visible" : "hidden" }}>
							{partner?.promotion}
						</Alert>
						{/* <Typography variant="body2">
							Open now: {candidate.is_open === null ? "-" : candidate.is_open ? "Yes" : "No"}
						</Typography> */}
					</CardContent>
				</Card>
			)
		})))
	}

	useEffect(() => {
		constructCards()
	}, [])

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
			{activeStep === candidates.length ? (
				<>
					<HowToVoteRoundedIcon color="lime" sx={{ fontSize: "150px" }} />
					<Button sx={{ mt: 4 }} onClick={() => handleCompleteSwiping(votes)}>Complete</Button>
				</>
			) : (
				<>
					{candidateCards[activeStep]}
					<Box sx={{
						display: 'flex',
						gap: 2,
					}}>
						<Button size="small" onClick={handleNo} sx={{ pr: 2 }}>
							<KeyboardArrowLeft />
							NO
						</Button>
						<Button size="small" onClick={handleYes} sx={{ pl: 2 }}>
							YES
							<KeyboardArrowRight />
						</Button>
					</Box>
					<MobileStepper
						variant="dots"
						steps={candidates.length}
						position="static"
						activeStep={activeStep}
						sx={{ justifyContent: 'center', backgroundColor: "darkgray.main", mt: 2 }}
					/>
				</>
			)}
		</Box >
	);
}

export default Swiper;
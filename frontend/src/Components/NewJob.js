import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Collapse, Chip, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

export default function NewJob(props) {
    const [expanded, setExpanded] = useState(false); 

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  return (
    <Card>
        <CardHeader 
            title={props.name}
            subheader={props.company}
            action={
                <Button variant={'outlined'} href={props.applyLink} color={'error'}>
                Apply
                </Button>
            }
        >
        
        </CardHeader>
        <CardActions disableSpacing>
            <Chip label={props.jobType} variant="outlined" />
            <Chip label={props.jobLocation} variant="outlined" />
            {props.senorityLevel ? <Chip label={props.senorityLevel} variant="outlined" /> : null}
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    Date Posted: {props.dateposted}
                </Typography>
                <Typography paragraph>
                    {props.jobDescription}
                </Typography>
            </CardContent>
        </Collapse>
    </Card>
  );
}

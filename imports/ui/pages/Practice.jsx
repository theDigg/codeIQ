import React from 'react';
import Accordion from '../Components/MUI/Accordion';
import AlignedList from '../Components/MUI/AlignedList';
import Badges from '../Components/MUI/Badges';
import Chips from '../Components/MUI/Chips';
import CustomizedMenu from '../Components/MUI/CustomizedMenu';
import IconTabs from '../Components/MUI/IconTabs';
import ImageAvatars from '../Components/MUI/ImageAvatars';
import InteractiveList from '../Components/MUI/IntetractiveList';
import Progress from '../Components/MUI/Progress';
import RecipeReviewCard from '../Components/MUI/RecipeReviewCard';
import Snackbar from '../Components/MUI/Snackbar';
import Switches from '../Components/MUI/Switches';
import SwitchList from '../Components/MUI/SwitchList';
import VerticalDividers from '../Components/MUI/VerticalDividers';

export default function PracticePage() {
  return (
    <div>
      <h1> Practice Page </h1>
      <Accordion />
      <AlignedList />
      <Badges />
      <Chips />
      <CustomizedMenu />
      <IconTabs />
      {/* <ImageAvatars /> */}
      <InteractiveList />
      <Progress />
      <RecipeReviewCard />
      <Snackbar />
      <Switches />
      <SwitchList />
      <VerticalDividers />
    </div>
  );
}

import React from 'react';
import Accordion from '../components/MUI/Accordion';
import AlignedList from '../components/MUI/AlignedList';
import Badges from '../components/MUI/Badges';
import Chips from '../components/MUI/Chips';
import CustomizedMenu from '../components/MUI/CustomizedMenu';
import IconTabs from '../components/MUI/IconTabs';
import ImageAvatars from '../components/MUI/ImageAvatars';
import InteractiveList from '../components/MUI/IntetractiveList';
import Progress from '../components/MUI/Progress';
import RecipeReviewCard from '../components/MUI/RecipeReviewCard';
import Snackbar from '../components/MUI/Snackbar';
import Switches from '../components/MUI/Switches';
import SwitchList from '../components/MUI/SwitchList';
import VerticalDividers from '../components/MUI/VerticalDividers';

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

"use client"
import React, { useState } from "react";
import { Tweet } from "../../typings.def";
import Feed from "../Feed/Feed";
import Widgetbar from "../Widgetbar/Widgetbar";
interface Props {
  tweets: Tweet[];
}
export default function MainView({ tweets }: Props) {
  const [filteredTweets, setFilteredTweets] = useState<string>("");
  return (
    <>
      <Feed tweets={tweets} filteredTweets={filteredTweets}/>
      <Widgetbar setFilteredTweets={setFilteredTweets}/>
    </>
  );
}

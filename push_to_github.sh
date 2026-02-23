#!/bin/bash
# Copy all built videos to a release folder
cd /tmp/motivational-reels

# Create releases folder
mkdir -p releases

# Copy completed videos
cp video-01-just-do-it/out/JustDoIt.mp4 releases/01-JustDoIt.mp4 2>/dev/null
cp video-02-five-second/out/FiveSecondRule.mp4 releases/02-FiveSecondRule.mp4 2>/dev/null
cp video-03-impossible/out/ImpossibleIsNothing.mp4 releases/03-ImpossibleIsNothing.mp4 2>/dev/null
cp video-04/out/RiseAndGrind.mp4 releases/04-RiseAndGrind.mp4 2>/dev/null
cp video-05/out/video-05.mp4 releases/05-StayHungry.mp4 2>/dev/null
cp video-06/out/video-06.mp4 releases/06-EmbraceTheSuck.mp4 2>/dev/null

ls -lh releases/

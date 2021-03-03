#!/bin/bash -x
mkdir -p ./texts/

for pdf in ./pdfs/*
do
  pdf2txt.py "$pdf" > "./texts/${pdf#./pdfs/}.txt"
done

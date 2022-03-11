import { useEffect, useState } from 'react';
import { CardMedia } from '@mui/material';
import { getPiePlot, type PlotValues } from 'src/utils';


interface ChartProps {
  title: string;
  height: string;
  width: string;
  values: PlotValues[];
}


/**
 * CardMedia component that gets and displays a chart from the Plot API Microservice 
 */
export default function ChartCardMedia({ title, values, height, width }: ChartProps): JSX.Element {
  const [imageURL, setImageURL] = useState<string>();
  
  useEffect(() => {
    const abortController = new AbortController();
    
    void (async () => {
      try {
        const imageBlob = await getPiePlot(title, values);
        setImageURL(URL.createObjectURL(imageBlob));
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    })();
    // for the cleanup function (on unmount) we should abort any outstanding requests and, more importantly, destroy
    // the image URL if it was created; see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    return () => {
      if (imageURL !== undefined) {
        URL.revokeObjectURL(imageURL);
      }
      abortController.abort();
    }
  });

  return (
    <CardMedia
      component="img"
      width={width}
      height={height}
      image={imageURL}
      alt="Pie chart showing most common search term matches"
      loading="lazy"
    />
  );
}

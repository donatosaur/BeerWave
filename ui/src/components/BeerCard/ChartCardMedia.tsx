import { useEffect, useState } from 'react';
import { CardMedia } from '@mui/material';
import { ErrorAlert } from 'src/components';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    void (async () => {
      try {
        const imageBlob = await getPiePlot(title, values);
        setImageURL(URL.createObjectURL(imageBlob));
      } catch (error) {
        setErrorMessage(`Something went wrong: ${error}`);
      }
    })();
    return () => {
      if (imageURL !== undefined) {
        // we need to destroy the image URL if it was created (see https://mzl.la/3J9Rn09)
        URL.revokeObjectURL(imageURL);
      }
      abortController.abort();
    }
  });

  return (
    <>
      { errorMessage && (
        <ErrorAlert errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      
      <CardMedia
        component="img"
        width={width}
        height={height}
        image={imageURL}
        alt="Pie chart showing most common search term matches"
        loading="lazy"
      />
    </>
  );
}

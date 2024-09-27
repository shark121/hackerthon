import { NextRequest, NextResponse } from "next/server";

const API_KEY = "AIzaSyCOJgfpChgRYt2iLy8sNqfzV2aOMT9Ouvs";

// The endpoint URL
const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// The image you want to analyze (base64 encoded)

async function APIREQ({ image }: { image:string  }) {
  const imageBase64 = image;

  // The request payload
  const requestPayload = {
    requests: [
      {
        image: {
          content: imageBase64,
        },
        features: [
          {
            type: "LABEL_DETECTION",
            maxResults: 10,
          },
        ],
      },
    ],
  };

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function POST(
  req: NextRequest,
  context: { params: { data: string[] } }
) {
  const collectedData = await req.formData();
  const imageFile = collectedData.get("imageFile") as File;
  const getFileTypeStartIndex = imageFile.type.indexOf("/") + 1;
  const fileType = imageFile.type.slice(getFileTypeStartIndex);
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const bufferString =  buffer.toString()
  await  APIREQ({image:bufferString})

  return NextResponse.json({ response: "success_1" });
}

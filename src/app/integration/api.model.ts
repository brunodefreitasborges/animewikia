export interface AnimeApiResponse {
  data: {
      id: string,
      type: string,
      attributes: {
        description: string,
        canonicalTitle: string,
        averageRating: string,
        coverImage: {
          original: string
        }
        posterImage: {
          original: string
        }
      }
    }
}

export interface QueryApiResponse {
  data: [
    {
      id: string,
      type: string,
      attributes: {
        description: string,
        canonicalTitle: string,
        averageRating: string,
        coverImage: {
          original: string
        }
        posterImage: {
          original: string
        }
      }
    }
  ]
}

export interface StreamingLinkApiResponse {
  data:[
    {
      attributes: {
        url: string
      }
    }
  ]

}

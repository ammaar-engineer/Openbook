export type BookChapter = {
  id: number
  name: string
  content: string
}

export type Book = {
  id: number
  title: string
  description: string
  created_at: string
  book_chapters: BookChapter[]
}

/**
 * Mock payload shaped exactly like the book API response.
 * Swap this single binding for the fetched book when the API is ready.
 */
export const MOCK_BOOK: Book = {
  id: 1,
  title: 'Dalam gelap terbitlah terang',
  description: 'Karangan novel imajinatif',
  created_at: 'waktu',
  book_chapters: [
    {
      id: 1,
      name: 'Chapter 01',
      content:
        'Berawal pada malam itu. Seorang pekerja kelelahan menghadapi kerjaan nya yang menumpuk akibat atasan nya yang memberi nya tugas tanpa pandang kondisi',
    },
    {
      id: 2,
      name: 'Chapter 02: The beginning',
      content:
        'Berawal pada malam itu. Seorang pekerja kelelahan menghadapi kerjaan nya yang menumpuk akibat atasan nya yang memberi nya tugas tanpa pandang kondisi',
    },
  ],
}

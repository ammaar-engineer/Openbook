import { useState } from 'react'
import { NoteCard, type Note } from '@/components/note_page/note-card'
import { NotesHeader } from '@/components/note_page/notes-header'
import type { NewNoteInput } from '@/components/note_page/dialogs/create-note-dialog'
import {
  NoteDialog,
  type NoteValues,
} from '@/components/note_page/dialogs/note-dialog'

const seedNotes: Omit<Note, 'id'>[] = [
  {
    title: 'Waktu yang pura-pura diam',
    body: `Waktu tidak pernah benar-benar berhenti. Ia hanya berpura-pura diam setiap kali kota menoleh ke belakang — seperti seseorang yang menahan napas di ambang pintu, berharap tidak ada yang menyadari kehadirannya. Di sudut-sudut kota, jam-jam lama disimpan di laci toko reparasi, di dinding rumah yang belum direnovasi, di menara gereja yang sudah tidak lagi dibunyikan. Setiap jam menyimpan versi waktunya sendiri, dan tidak ada dua jam yang sepakat tentang pukul berapa sekarang.

Penduduk kota terbiasa hidup dengan ketidaksepakatan itu. Mereka bertanya jam pada orang yang berbeda dan menerima jawaban yang berbeda pula, lalu memilih jawaban yang paling cocok dengan suasana hati mereka hari itu. Ada yang bilang ini bentuk kejujuran paling murni: waktu memang bukan satu, melainkan banyak, dan kota hanya tempat di mana banyak waktu itu dipaksa berdampingan.

Namun ada harga yang harus dibayar. Orang-orang mulai lupa kapan sesuatu benar-benar terjadi. Peristiwa-peristiwa besar larut menjadi anekdot, dan anekdot menjadi mitos. Kota tidak kehilangan sejarahnya; ia hanya kehilangan urutannya. Dan mungkin, di sinilah cerita ini dimulai — bukan pada suatu tanggal, melainkan pada suatu kebingungan yang diwariskan dari generasi ke generasi, seperti jam tua yang tetap berdetak meski tidak ada yang tahu lagi ia menunjukkan waktu apa.`,
    createdAt: '2025-05-08T09:15:00.000Z',
  },
  {
    title: 'Bab 3 dari sisi penjaga gerbang',
    body: `Bab ini sengaja tidak dimulai dari awal. Ia dimulai dari seorang penjaga gerbang yang sudah bertugas selama tiga puluh tahun dan tidak pernah sekali pun membaca buku tentang kota yang ia jaga. Baginya, kota bukan teks; kota adalah deretan wajah yang lewat setiap pagi, deretan nama yang ia hafal tanpa pernah menuliskannya.

Satu kejadian, dua garis waktu, tanpa penjelasan. Pembaca akan menemukan dua versi dari malam yang sama: versi penjaga gerbang, yang melihat semuanya dari pos jaga dengan lampu minyak yang berkedip, dan versi seorang pelancong yang kebetulan melintas dan mengingat malam itu sebagai malam paling terang dalam hidupnya. Kedua versi tidak saling membantah, tetapi juga tidak saling melengkapi. Mereka hanya berdiri berdampingan, seperti dua lukisan yang digantung di dinding yang sama.

Tugas pembaca bukan memilih mana yang benar. Tugas pembaca adalah menyusun urutannya sendiri, dan menyadari bahwa urutan yang ia susun mungkin hanya mencerminkan dirinya, bukan kejadiannya. Penjaga gerbang itu sendiri tidak pernah merasa perlu menjelaskan apa pun. Ia hanya membuka gerbang setiap pagi dan menutupnya setiap malam, dan bagi sebagian orang, itulah satu-satunya kronologi yang tersisa.`,
    createdAt: '2025-05-03T14:40:00.000Z',
  },
  {
    title: 'Rute sebagai jaringan keputusan',
    body: `Pelayaran Nusantara bukan garis lurus di atas peta. Ia adalah jaringan keputusan yang saling bertumpuk: keputusan untuk berlayar, keputusan untuk singgah, keputusan untuk menunggu angin, keputusan untuk tidak kembali. Setiap pelabuhan mengubah arah, harga, dan cerita. Sebuah barang yang dibeli di satu pulau bisa menjadi barang yang sama sekali berbeda maknanya ketika tiba di pulau lain — bukan karena barangnya berubah, tetapi karena orang-orang yang menerimanya memiliki kebutuhan yang berbeda.

Para navigator lama tidak menggambar rute sebagai garis. Mereka menggambarnya sebagai pohon: dari satu titik, banyak cabang; dari banyak cabang, banyak kemungkinan yang tidak pernah diambil. Peta-peta mereka penuh dengan tanda yang tidak bisa dibaca orang luar, catatan tentang musim, tentang bau laut, tentang hari-hari ketika pelabuhan tertentu sebaiknya dihindari. Semua itu bukan data, melainkan pengalaman yang dipadatkan menjadi tanda.

Yang paling menarik dari rute-rute ini adalah bahwa mereka tidak pernah selesai. Setiap pelayaran menambahkan cabang baru, dan setiap cabang baru membuat rute lama tampak seperti salah satu kemungkinan saja, bukan satu-satunya jalan. Dengan kata lain, rute adalah cara berpikir, bukan cara berpindah. Dan siapa pun yang membaca catatan pelayaran ini dengan saksama akan menyadari bahwa ia sedang membaca sebuah filsafat yang disamarkan sebagai daftar pelabuhan.`,
    createdAt: '2025-04-29T08:05:00.000Z',
  },
  {
    title: 'Dinding sebagai kebiasaan',
    body: `Musim dingin di sini tidak datang sebagai cuaca, tapi sebagai kebiasaan. Orang-orang tidak bertanya apakah hari ini dingin; mereka sudah tahu, karena dingin sudah menjadi latar belakang dari segala hal yang mereka lakukan. Dinding-dinding rumah menebal bukan karena arsitek merancangnya demikian, tetapi karena penghuninya menambahkan lapisan demi lapisan setiap kali musim dingin terasa lebih dingin dari sebelumnya.

Dinding adalah kebiasaan yang mengeras. Ia menyimpan jejak tangan yang menambalnya, suara percakapan yang terjadi di dekatnya, dan keheningan yang tumbuh di celah-celahnya. Sebuah dinding yang sudah berdiri lama bukan lagi benda; ia adalah semacam ingatan kolektif yang tidak bisa dibaca, hanya bisa dirasakan. Ketika seseorang bersandar padanya, ia bersandar pada puluhan tahun kebiasaan yang tidak pernah dituliskan siapa pun.

Yang mengejutkan, dinding-dinding ini tidak pernah terasa menyesakkan. Mereka justru memberi bentuk pada ruang, dan dengan demikian memberi bentuk pada kehidupan. Tanpa dinding, dingin akan menjadi ancaman; dengan dinding, dingin menjadi latar. Dan mungkin itulah pelajaran yang bisa dibawa dari sini: tidak semua hal perlu dihilangkan agar bisa ditanggung. Sebagian hal cukup diberi dinding, lalu dirawat sebagai kebiasaan.`,
    createdAt: '2025-04-21T17:30:00.000Z',
  },
  {
    title: 'Fragmen, bukan kronologi',
    body: `Paper Atlas dan Notes from the North menyusun bab sebagai fragmen — hanya kedekatan suasana, bukan urutan peristiwa. Kedua buku ini menolak gagasan bahwa cerita harus bergerak dari awal ke akhir. Bagi keduanya, cerita adalah kumpulan momen yang saling berdekatan secara emosional, bukan secara temporal. Dua fragmen bisa berasal dari tahun yang berbeda dan tetap terasa bersebelahan, sementara dua fragmen dari hari yang sama bisa terasa berjauhan.

Pembaca yang terbiasa dengan kronologi mungkin akan merasa gelisah. Di mana awalnya? Di mana akhirnya? Namun kegelisahan itu justru bagian dari pengalaman membacanya. Fragmen memaksa pembaca untuk menjadi penyusun, bukan penerima. Setiap kali pembaca menghubungkan dua fragmen, ia sedang menciptakan makna yang tidak pernah ada di dalam teks itu sendiri.

Yang menarik, fragmen-fragmen ini tidak pernah acak. Mereka dipilih dengan semacam ketelitian puitis: warna yang sama, bau yang sama, kata yang berulang di tempat yang tak terduga. Keteraturan itu tidak terlihat pada permukaan, tetapi terasa pada lapisan yang lebih dalam. Dengan kata lain, fragmen bukan bentuk dari ketidakteraturan, melainkan bentuk lain dari keteraturan — keteraturan yang tidak mau mengaku sebagai keteraturan.`,
    createdAt: '2025-04-14T11:20:00.000Z',
  },
  {
    title: 'Tiga penulis, satu penolakan',
    body: `Prameswari, Haiden, Berg — cari titik ketika ketiganya menolak linearitas waktu. Ketiganya berasal dari latar yang berbeda, menulis dengan gaya yang berbeda, dan membaca tradisi yang berbeda. Namun ada satu hal yang menyatukan mereka: kecurigaan yang mendalam terhadap gagasan bahwa waktu berjalan lurus dari masa lalu ke masa depan.

Bagi Prameswari, waktu adalah lapisan yang saling menembus; masa lalu tidak pernah benar-benar lewat, ia hanya menunggu untuk muncul kembali di tempat yang tidak terduga. Bagi Haiden, waktu adalah kesepakatan sosial yang rapuh; ia bisa dilanggar kapan saja oleh ingatan yang keras kepala. Bagi Berg, waktu adalah ilusi yang nyaman; kita membutuhkannya untuk hidup, tetapi kita tidak boleh mempercayainya sepenuhnya.

Titik temu ketiganya bukan pada jawaban, melainkan pada penolakan. Mereka menolak untuk menjadikan waktu sebagai garis lurus, dan penolakan itu membuka ruang bagi bentuk-bentuk baru: siklus, spiral, jaringan, fragmen. Ketika ketiganya dibaca berdampingan, yang muncul bukan sintesis, melainkan semacam paduan suara yang tidak selalu harmonis. Dan mungkin justru ketidakharmonisan itulah yang mereka maksud: waktu bukan satu suara, melainkan banyak suara yang saling menimpa.`,
    createdAt: '2025-04-07T19:45:00.000Z',
  },
  {
    title: 'Senja sebagai keputusan',
    body: `Senja bukan waktu, tapi keputusan untuk berhenti. Matahari tidak pernah benar-benar memutuskan apa pun; ia hanya bergerak sesuai hukum yang sudah ditetapkan jauh sebelum ada yang bisa mengamatinya. Namun bagi manusia yang menatapnya, senja selalu terasa seperti keputusan: keputusan untuk berhenti bekerja, berhenti berbicara, berhenti berharap, atau berhenti menunggu.

Karena itu, senja tidak pernah sama di dua tempat. Di satu kota, senja adalah tanda bahwa hari telah selesai; di kota lain, senja adalah tanda bahwa malam baru dimulai. Di satu rumah, senja adalah saat untuk berkumpul; di rumah lain, senja adalah saat untuk pergi. Yang berubah bukan langitnya, melainkan keputusan yang dilekatkan orang-orang padanya.

Ada semacam kelegaan dalam menyadari bahwa senja adalah keputusan. Jika senja adalah keputusan, maka kita punya kuasa untuk memutuskannya — kapan ia dimulai, kapan ia berakhir, dan apa yang kita bawa ke dalamnya. Orang-orang yang belajar memutuskan senja tidak lagi menjadi budak jam. Mereka menjadi penulis waktu mereka sendiri, dan langit hanyalah kanvas yang kebetulan tersedia.`,
    createdAt: '2025-03-30T10:10:00.000Z',
  },
  {
    title: 'Bahasa sebagai jarak',
    body: `Esai pendek dengan tema berulang: bahasa sebagai jarak, jarak sebagai kehilangan. Setiap kali kita berbicara, kita sebenarnya sedang menciptakan jarak — jarak antara apa yang kita rasakan dan apa yang kita ucapkan, antara apa yang kita maksud dan apa yang didengar orang lain. Bahasa tidak menjembatani jarak itu; ia justru memperjelasnya, seperti lampu yang menerangi tebing agar kita bisa melihat seberapa dalam jurangnya.

Namun jarak tidak selalu buruk. Jarak memungkinkan kita melihat sesuatu secara utuh, sebagaimana kita tidak bisa melihat hutan jika berdiri terlalu dekat dengan pepohonan. Bahasa memberi kita jarak yang cukup untuk merenung, untuk menimbang, untuk menunda. Tetapi jarak yang sama juga membuat kita kehilangan hal-hal yang hanya bisa dirasakan dari dekat: kehangatan tangan, getaran suara, keheningan yang tidak perlu dijelaskan.

Karena itu, tema berulang dalam esai-esai ini bukanlah bahasa sebagai alat komunikasi, melainkan bahasa sebagai bentuk kehilangan yang dilembagakan. Setiap kata yang kita pilih adalah kata yang tidak kita pilih; setiap makna yang kita sampaikan adalah makna yang kita korbankan. Dan mungkin, pada akhirnya, menulis adalah cara paling jujur untuk mengakui bahwa kita tidak pernah bisa sepenuhnya sampai kepada orang lain — tetapi kita tetap mencoba, dan dalam percobaan itu, sesuatu yang mirip pemahaman kadang-kadang muncul.`,
    createdAt: '2025-03-22T13:25:00.000Z',
  },
  {
    title: 'Hujan yang kita hafal',
    body: `Rumah adalah hujan yang kita hafal di luar kepala. Bukan atapnya, bukan dindingnya, bukan alamatnya — melainkan suara hujan yang jatuh di atasnya, yang bisa kita kenali bahkan ketika kita sedang berada jauh dari sana. Setiap rumah memiliki irama hujan sendiri: ada yang deras dan marah, ada yang pelan dan sabar, ada yang datang tiba-tiba lalu pergi tanpa pamit.

Menghafal hujan berarti menghafal sesuatu yang tidak pernah sama. Hujan berikutnya selalu berbeda dari hujan sebelumnya, tetapi bagi telinga yang sudah terbiasa, perbedaannya justru menjadi tanda pengenal. Kita mengenali rumah bukan dari yang tetap, melainkan dari yang berubah dengan cara yang sama. Di sinilah keanehan ingatan: ia mengikat kita pada sesuatu bukan karena kesamaannya, melainkan karena pola perubahannya.

Orang-orang yang merantau sering mengatakan bahwa mereka merindukan rumah setiap kali hujan turun. Yang mereka rindukan bukan rumah itu sendiri, melainkan kemampuan untuk mengenali hujan tanpa perlu berpikir. Di tempat baru, hujan selalu terasa asing; ia tidak memberi tahu apa pun tentang siapa kita. Dan mungkin itulah definisi paling sederhana dari kehilangan: ketika hujan tidak lagi berbicara dalam bahasa yang kita hafal.`,
    createdAt: '2025-03-15T07:50:00.000Z',
  },
]

const initialNotes: Note[] = seedNotes.map((note, index) => ({
  id: `note-${index + 1}`,
  ...note,
}))

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? null

  function handleCreateNote({ title }: NewNoteInput) {
    setNotes((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        body: '',
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  function handleSaveNote(values: NoteValues) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNoteId ? { ...note, ...values } : note,
      ),
    )
  }

  function handleDeleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id))

    if (activeNoteId === id) setActiveNoteId(null)
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <NotesHeader count={notes.length} onCreate={handleCreateNote} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            onOpen={() => setActiveNoteId(note.id)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>

      <NoteDialog
        note={activeNote}
        open={activeNote !== null}
        onOpenChange={(open) => {
          if (!open) setActiveNoteId(null)
        }}
        onSave={handleSaveNote}
      />
    </div>
  )
}

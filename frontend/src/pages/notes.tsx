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
    body: `Waktu $E = Mc^2$ tidak pernah benar-benar berhenti. Ia hanya berpura-pura diam setiap kali kota menoleh ke belakang — seperti seseorang yang menahan napas di ambang pintu, berharap tidak ada yang menyadari kehadirannya. Di sudut-sudut kota, jam-jam lama disimpan di laci toko reparasi, di dinding rumah yang belum direnovasi, di menara gereja yang sudah tidak lagi dibunyikan. Setiap jam menyimpan versi waktunya sendiri, dan tidak ada dua jam yang sepakat tentang pukul berapa sekarang.

Penduduk kota terbiasa hidup dengan ketidaksepakatan itu. Mereka bertanya jam pada orang yang berbeda dan menerima jawaban yang berbeda pula, lalu memilih jawaban yang paling cocok dengan suasana hati mereka hari itu. Ada yang bilang ini bentuk kejujuran paling murni: waktu memang bukan satu, melainkan banyak, dan kota hanya tempat di mana banyak waktu itu dipaksa berdampingan.

Namun ada harga yang harus dibayar. Orang-orang mulai lupa kapan sesuatu benar-benar terjadi. Peristiwa-peristiwa besar larut menjadi anekdot, dan anekdot menjadi mitos. Kota tidak kehilangan sejarahnya; ia hanya kehilangan urutannya. Dan mungkin, di sinilah cerita ini dimulai — bukan pada suatu tanggal, melainkan pada suatu kebingungan yang diwariskan dari generasi ke generasi, seperti jam tua yang tetap berdetak meski tidak ada yang tahu lagi ia menunjukkan waktu apa.

Secara matematis, gagasan bahwa waktu bukan satu melainkan banyak bisa diibaratkan sebagai himpunan waktu lokal:

\`\`\`math
T = \{ t_1, t_2, \dots, t_n \}, \quad t_i \neq t_j \text{ untuk } i \neq j
\`\`\`

Setiap jam menyimpan parameter waktunya sendiri, dan ketidaksepakatan antarjam adalah selisih antar-parameter:

\`\`\`math
\Delta_{ij} = |t_i - t_j| > 0
\`\`\`

Jika kota memilih satu waktu "resmi", ia sebenarnya sedang melakukan proyeksi dari banyak waktu ke satu waktu:

\`\`\`math
f: T \to \mathbb{R}, \quad f(t_i) = t_{\text{resmi}}
\`\`\`

Dan kehilangan urutan sejarah tak lain adalah hilangnya pemetaan monoton dari peristiwa ke waktu:

\`\`\`math
\phi: E \to T \text{ yang monoton tidak lagi terdefinisi dengan baik}
\`\`\`

Dengan kata lain, kota kehilangan struktur ordenya, bukan kehilangan anggotanya.`,
    createdAt: '2025-05-08T09:15:00.000Z',
  },
  {
    title: 'Bab 3 dari sisi penjaga gerbang',
    body: `Bab ini sengaja tidak dimulai dari awal. Ia dimulai dari seorang penjaga gerbang yang sudah bertugas selama tiga puluh tahun dan tidak pernah sekali pun membaca buku tentang kota yang ia jaga. Baginya, kota bukan teks; kota adalah deretan wajah yang lewat setiap pagi, deretan nama yang ia hafal tanpa pernah menuliskannya.

Satu kejadian, dua garis waktu, tanpa penjelasan. Pembaca akan menemukan dua versi dari malam yang sama: versi penjaga gerbang, yang melihat semuanya dari pos jaga dengan lampu minyak yang berkedip, dan versi seorang pelancong yang kebetulan melintas dan mengingat malam itu sebagai malam paling terang dalam hidupnya. Kedua versi tidak saling membantah, tetapi juga tidak saling melengkapi. Mereka hanya berdiri berdampingan, seperti dua lukisan yang digantung di dinding yang sama.

Tugas pembaca bukan memilih mana yang benar. Tugas pembaca adalah menyusun urutannya sendiri, dan menyadari bahwa urutan yang ia susun mungkin hanya mencerminkan dirinya, bukan kejadiannya. Penjaga gerbang itu sendiri tidak pernah merasa perlu menjelaskan apa pun. Ia hanya membuka gerbang setiap pagi dan menutupnya setiap malam, dan bagi sebagian orang, itulah satu-satunya kronologi yang tersisa.

Dua versi dari satu kejadian dapat dimodelkan sebagai dua fungsi waktu yang berbeda atas himpunan kejadian yang sama:

\`\`\`math
\tau_P: E \to \mathbb{R}, \quad \tau_L: E \to \mathbb{R}
\`\`\`

Keduanya tidak harus memenuhi hubungan monoton satu sama lain. Yang penting adalah keduanya terdefinisi pada domain yang sama:

\`\`\`math
\text{dom}(\tau_P) = \text{dom}(\tau_L) = E
\`\`\`

Pembaca yang menyusun urutan sendiri sebenarnya sedang membangun fungsi urutan baru:

\`\`\`math
\sigma: E \to \mathbb{N}
\`\`\`

dan fungsi ini belum tentu sama dengan $\tau_P$ maupun $\tau_L$. Inilah sebabnya "kebenaran" versi penjaga dan pelancong tidak saling meniadakan: keduanya adalah pemetaan yang sah, hanya berbeda parameter.`,
    createdAt: '2025-05-03T14:40:00.000Z',
  },
  {
    title: 'Rute sebagai jaringan keputusan',
    body: `Pelayaran Nusantara bukan garis lurus di atas peta. Ia adalah jaringan keputusan yang saling bertumpuk: keputusan untuk berlayar, keputusan untuk singgah, keputusan untuk menunggu angin, keputusan untuk tidak kembali. Setiap pelabuhan mengubah arah, harga, dan cerita. Sebuah barang yang dibeli di satu pulau bisa menjadi barang yang sama sekali berbeda maknanya ketika tiba di pulau lain — bukan karena barangnya berubah, tetapi karena orang-orang yang menerimanya memiliki kebutuhan yang berbeda.

Para navigator lama tidak menggambar rute sebagai garis. Mereka menggambarnya sebagai pohon: dari satu titik, banyak cabang; dari banyak cabang, banyak kemungkinan yang tidak pernah diambil. Peta-peta mereka penuh dengan tanda yang tidak bisa dibaca orang luar, catatan tentang musim, tentang bau laut, tentang hari-hari ketika pelabuhan tertentu sebaiknya dihindari. Semua itu bukan data, melainkan pengalaman yang dipadatkan menjadi tanda.

Yang paling menarik dari rute-rute ini adalah bahwa mereka tidak pernah selesai. Setiap pelayaran menambahkan cabang baru, dan setiap cabang baru membuat rute lama tampak seperti salah satu kemungkinan saja, bukan satu-satunya jalan. Dengan kata lain, rute adalah cara berpikir, bukan cara berpindah. Dan siapa pun yang membaca catatan pelayaran ini dengan saksama akan menyadari bahwa ia sedang membaca sebuah filsafat yang disamarkan sebagai daftar pelabuhan.

Secara matematis, jaringan pelabuhan dan rute dapat direpresentasikan sebagai graf berbobot:

\`\`\`math
G = (V, E), \quad V = \{\text{pelabuhan}\}, \quad E = \{(u,v) \mid \text{ada rute } u \to v\}
\`\`\`

Setiap sisi memiliki bobot jarak, biaya, atau waktu:

\`\`\`math
w: E \to \mathbb{R}_{\ge 0}
\`\`\`

Rute terpendek dari pelabuhan asal $s$ ke pelabuhan tujuan $t$ adalah solusi optimasi:

\`\`\`math
\min_{P \in \mathcal{P}(s,t)} \sum_{e \in P} w(e)
\`\`\`

dengan $\mathcal{P}(s,t)$ menyatakan himpunan semua lintasan dari $s$ ke $t$. Namun para navigator lama tidak mencari minimum tunggal; mereka menyimpan banyak kemungkinan cabang, sehingga yang mereka bangun sebenarnya adalah pohon keputusan:

\`\`\`math
\mathcal{T} = \{ P_1, P_2, \dots, P_k \}
\`\`\`

dan setiap pelayaran baru menambah anggota himpunan ini:

\`\`\`math
\mathcal{T}_{n+1} = \mathcal{T}_n \cup \{ P_{\text{baru}} \}
\`\`\`

Dengan demikian rute bukan satu garis, melainkan keluarga lintasan yang tumbuh seiring waktu.`,
    createdAt: '2025-04-29T08:05:00.000Z',
  },
  {
    title: 'Dinding sebagai kebiasaan',
    body: `Musim dingin di sini tidak datang sebagai cuaca, tapi sebagai kebiasaan. Orang-orang tidak bertanya apakah hari ini dingin; mereka sudah tahu, karena dingin sudah menjadi latar belakang dari segala hal yang mereka lakukan. Dinding-dinding rumah menebal bukan karena arsitek merancangnya demikian, tetapi karena penghuninya menambahkan lapisan demi lapisan setiap kali musim dingin terasa lebih dingin dari sebelumnya.

Dinding adalah kebiasaan yang mengeras. Ia menyimpan jejak tangan yang menambalnya, suara percakapan yang terjadi di dekatnya, dan keheningan yang tumbuh di celah-celahnya. Sebuah dinding yang sudah berdiri lama bukan lagi benda; ia adalah semacam ingatan kolektif yang tidak bisa dibaca, hanya bisa dirasakan. Ketika seseorang bersandar padanya, ia bersandar pada puluhan tahun kebiasaan yang tidak pernah dituliskan siapa pun.

Yang mengejutkan, dinding-dinding ini tidak pernah terasa menyesakkan. Mereka justru memberi bentuk pada ruang, dan dengan demikian memberi bentuk pada kehidupan. Tanpa dinding, dingin akan menjadi ancaman; dengan dinding, dingin menjadi latar. Dan mungkin itulah pelajaran yang bisa dibawa dari sini: tidak semua hal perlu dihilangkan agar bisa ditanggung. Sebagian hal cukup diberi dinding, lalu dirawat sebagai kebiasaan.

Penebalan dinding dari tahun ke tahun dapat dimodelkan sebagai jumlah lapisan:

\`\`\`math
d_n = d_0 + \sum_{k=1}^{n} \Delta d_k, \quad \Delta d_k \ge 0
\`\`\`

dengan $d_n$ ketebalan dinding setelah $n$ musim dingin. Laju penebalan bergantung pada selisih suhu yang dirasakan:

\`\`\`math
\Delta d_k \propto \max(0, T_{\text{nyaman}} - T_k)
\`\`\`

Jika ketebalan dianggap kontinu terhadap waktu, modelnya menjadi persamaan diferensial sederhana:

\`\`\`math
\frac{dD}{dt} = \alpha \max(0, T_{\text{nyaman}} - T(t)), \quad \alpha > 0
\`\`\`

Solusinya adalah akumulasi "rasa dingin" sepanjang waktu:

\`\`\`math
D(t) = D(0) + \alpha \int_{0}^{t} \max(0, T_{\text{nyaman}} - T(s)) \, ds
\`\`\`

Inilah matematika dari kebiasaan yang mengeras: bukan satu peristiwa besar, melainkan integral dari ketidaknyamanan kecil yang berulang.`,
    createdAt: '2025-04-21T17:30:00.000Z',
  },
  {
    title: 'Fragmen, bukan kronologi',
    body: `Paper Atlas dan Notes from the North menyusun bab sebagai fragmen — hanya kedekatan suasana, bukan urutan peristiwa. Kedua buku ini menolak gagasan bahwa cerita harus bergerak dari awal ke akhir. Bagi keduanya, cerita adalah kumpulan momen yang saling berdekatan secara emosional, bukan secara temporal. Dua fragmen bisa berasal dari tahun yang berbeda dan tetap terasa bersebelahan, sementara dua fragmen dari hari yang sama bisa terasa berjauhan.

Pembaca yang terbiasa dengan kronologi mungkin akan merasa gelisah. Di mana awalnya? Di mana akhirnya? Namun kegelisahan itu justru bagian dari pengalaman membacanya. Fragmen memaksa pembaca untuk menjadi penyusun, bukan penerima. Setiap kali pembaca menghubungkan dua fragmen, ia sedang menciptakan makna yang tidak pernah ada di dalam teks itu sendiri.

Yang menarik, fragmen-fragmen ini tidak pernah acak. Mereka dipilih dengan semacam ketelitian puitis: warna yang sama, bau yang sama, kata yang berulang di tempat yang tak terduga. Keteraturan itu tidak terlihat pada permukaan, tetapi terasa pada lapisan yang lebih dalam. Dengan kata lain, fragmen bukan bentuk dari ketidakteraturan, melainkan bentuk lain dari keteraturan — keteraturan yang tidak mau mengaku sebagai keteraturan.

Jika fragmen dinyatakan sebagai himpunan $F = \{f_1, f_2, \dots, f_m\}$, maka kedekatan emosional antar-fragmen dapat dinyatakan sebagai fungsi jarak:

\`\`\`math
d_E: F \times F \to \mathbb{R}_{\ge 0}
\`\`\`

Dua fragmen terasa bersebelahan bila jarak emosionalnya kecil:

\`\`\`math
d_E(f_i, f_j) < \varepsilon
\`\`\`

meskipun jarak temporalnya besar:

\`\`\`math
d_T(f_i, f_j) = |t_i - t_j| \gg 0
\`\`\`

Susunan fragmen oleh pembaca adalah relasi keterdekatan yang membentuk graf:

\`\`\`math
G_E = (F, \{\{f_i, f_j\} \mid d_E(f_i, f_j) < \varepsilon\})
\`\`\`

Keteraturan puitis yang tersembunyi dapat dipandang sebagai pola berulang pada fitur fragmen:

\`\`\`math
\phi(f_i) = (\text{warna}_i, \text{bau}_i, \text{kata}_i)
\`\`\`

dan pola itu muncul sebagai pengulangan nilai $\phi$ di tempat-tempat yang tak terduga. Jadi fragmen bukan ketiadaan keteraturan, melainkan keteraturan pada ruang fitur yang berbeda.`,
    createdAt: '2025-04-14T11:20:00.000Z',
  },
  {
    title: 'Tiga penulis, satu penolakan',
    body: `Prameswari, Haiden, Berg — cari titik ketika ketiganya menolak linearitas waktu. Ketiganya berasal dari latar yang berbeda, menulis dengan gaya yang berbeda, dan membaca tradisi yang berbeda. Namun ada satu hal yang menyatukan mereka: kecurigaan yang mendalam terhadap gagasan bahwa waktu berjalan lurus dari masa lalu ke masa depan.

Bagi Prameswari, waktu adalah lapisan yang saling menembus; masa lalu tidak pernah benar-benar lewat, ia hanya menunggu untuk muncul kembali di tempat yang tidak terduga. Bagi Haiden, waktu adalah kesepakatan sosial yang rapuh; ia bisa dilanggar kapan saja oleh ingatan yang keras kepala. Bagi Berg, waktu adalah ilusi yang nyaman; kita membutuhkannya untuk hidup, tetapi kita tidak boleh mempercayainya sepenuhnya.

Titik temu ketiganya bukan pada jawaban, melainkan pada penolakan. Mereka menolak untuk menjadikan waktu sebagai garis lurus, dan penolakan itu membuka ruang bagi bentuk-bentuk baru: siklus, spiral, jaringan, fragmen. Ketika ketiganya dibaca berdampingan, yang muncul bukan sintesis, melainkan semacam paduan suara yang tidak selalu harmonis. Dan mungkin justru ketidakharmonisan itulah yang mereka maksud: waktu bukan satu suara, melainkan banyak suara yang saling menimpa.

Linearitas waktu secara matematis dapat dinyatakan sebagai pemetaan monoton dari peristiwa ke bilangan real:

\`\`\`math
\tau: E \to \mathbb{R}, \quad e_1 \prec e_2 \implies \tau(e_1) < \tau(e_2)
\`\`\`

Penolakan terhadap linearitas berarti menolak keberadaan pemetaan global semacam itu. Sebagai gantinya, waktu dapat dimodelkan sebagai relasi parsial:

\`\`\`math
\preceq \;\subseteq E \times E
\`\`\`

yang tidak harus total. Artinya, ada pasangan peristiwa yang tidak terbandingkan:

\`\`\`math
\exists e_1, e_2 \in E : \neg(e_1 \preceq e_2) \land \neg(e_2 \preceq e_1)
\`\`\`

Bentuk siklus dapat dinyatakan sebagai relasi ekuivalensi modular:

\`\`\`math
t \sim t' \iff t \equiv t' \pmod{P}
\`\`\`

Bentuk spiral adalah komposisi antara rotasi dan translasi:

\`\`\`math
\mathbf{r}(\theta) = (a\theta \cos\theta, \; a\theta \sin\theta)
\`\`\`

Bentuk jaringan adalah graf berarah atas peristiwa:

\`\`\`math
G = (E, \preceq)
\`\`\`

Ketidakharmonisan ketiga penulis, dalam bahasa ini, adalah fakta bahwa gabungan relasi mereka tidak membentuk rantai total, melainkan sebuah poset (partially ordered set) yang bercabang.`,
    createdAt: '2025-04-07T19:45:00.000Z',
  },
  {
    title: 'Senja sebagai keputusan',
    body: `Senja bukan waktu, tapi keputusan untuk berhenti. Matahari tidak pernah benar-benar memutuskan apa pun; ia hanya bergerak sesuai hukum yang sudah ditetapkan jauh sebelum ada yang bisa mengamatinya. Namun bagi manusia yang menatapnya, senja selalu terasa seperti keputusan: keputusan untuk berhenti bekerja, berhenti berbicara, berhenti berharap, atau berhenti menunggu.

Karena itu, senja tidak pernah sama di dua tempat. Di satu kota, senja adalah tanda bahwa hari telah selesai; di kota lain, senja adalah tanda bahwa malam baru dimulai. Di satu rumah, senja adalah saat untuk berkumpul; di rumah lain, senja adalah saat untuk pergi. Yang berubah bukan langitnya, melainkan keputusan yang dilekatkan orang-orang padanya.

Ada semacam kelegaan dalam menyadari bahwa senja adalah keputusan. Jika senja adalah keputusan, maka kita punya kuasa untuk memutuskannya — kapan ia dimulai, kapan ia berakhir, dan apa yang kita bawa ke dalamnya. Orang-orang yang belajar memutuskan senja tidak lagi menjadi budak jam. Mereka menjadi penulis waktu mereka sendiri, dan langit hanyalah kanvas yang kebetulan tersedia.

Secara astronomis, posisi matahari terhadap horizon dapat dinyatakan dengan sudut elevasi:

\`\`\`math
h(t) = \arcsin\!\left( \sin\phi \sin\delta + \cos\phi \cos\delta \cos H(t) \right)
\`\`\`

dengan $\phi$ lintang tempat, $\delta$ deklinasi matahari, dan $H(t)$ sudut jam. Senja astronomis terjadi ketika:

\`\`\`math
-18^\circ \le h(t) \le 0^\circ
\`\`\`

Namun "senja sebagai keputusan" berarti ambang batas itu bukan tetap, melainkan dipilih:

\`\`\`math
h_{\text{senja}} = c, \quad c \in [-18^\circ, 0^\circ]
\`\`\`

Waktu senja menurut keputusan $c$ adalah solusi dari:

\`\`\`math
h(t_c) = c
\`\`\`

Jika dua orang memilih ambang berbeda, $c_1 \neq c_2$, maka waktu senja mereka juga berbeda:

\`\`\`math
t_{c_1} \neq t_{c_2}
\`\`\`

Inilah matematika dari kalimat "senja tidak pernah sama di dua tempat": yang berbeda bukan langitnya, melainkan parameter ambang yang dilekatkan orang-orang padanya.`,
    createdAt: '2025-03-30T10:10:00.000Z',
  },
  {
    title: 'Bahasa sebagai jarak',
    body: `Esai pendek dengan tema berulang: bahasa sebagai jarak, jarak sebagai kehilangan. Setiap kali kita berbicara, kita sebenarnya sedang menciptakan jarak — jarak antara apa yang kita rasakan dan apa yang kita ucapkan, antara apa yang kita maksud dan apa yang didengar orang lain. Bahasa tidak menjembatani jarak itu; ia justru memperjelasnya, seperti lampu yang menerangi tebing agar kita bisa melihat seberapa dalam jurangnya.

Namun jarak tidak selalu buruk. Jarak memungkinkan kita melihat sesuatu secara utuh, sebagaimana kita tidak bisa melihat hutan jika berdiri terlalu dekat dengan pepohonan. Bahasa memberi kita jarak yang cukup untuk merenung, untuk menimbang, untuk menunda. Tetapi jarak yang sama juga membuat kita kehilangan hal-hal yang hanya bisa dirasakan dari dekat: kehangatan tangan, getaran suara, keheningan yang tidak perlu dijelaskan.

Karena itu, tema berulang dalam esai-esai ini bukanlah bahasa sebagai alat komunikasi, melainkan bahasa sebagai bentuk kehilangan yang dilembagakan. Setiap kata yang kita pilih adalah kata yang tidak kita pilih; setiap makna yang kita sampaikan adalah makna yang kita korbankan. Dan mungkin, pada akhirnya, menulis adalah cara paling jujur untuk mengakui bahwa kita tidak pernah bisa sepenuhnya sampai kepada orang lain — tetapi kita tetap mencoba, dan dalam percobaan itu, sesuatu yang mirip pemahaman kadang-kadang muncul.

Misalkan pengalaman batin dinyatakan sebagai vektor dalam ruang makna:

\`\`\`math
\mathbf{x} \in \mathbb{R}^n
\`\`\`

dan ucapan dinyatakan sebagai vektor lain:

\`\`\`math
\mathbf{y} = f(\mathbf{x}) \in \mathbb{R}^n
\`\`\`

Jarak antara keduanya adalah ukuran kehilangan:

\`\`\`math
d(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\|_2
\`\`\`

Setiap kata yang dipilih adalah proyeksi ke subruang makna tertentu:

\`\`\`math
\mathbf{y} = P_W \mathbf{x}, \quad P_W^2 = P_W, \quad P_W = P_W^\top
\`\`\`

dan proyeksi selalu memperkecil norma:

\`\`\`math
\|P_W \mathbf{x}\|_2 \le \|\mathbf{x}\|_2
\`\`\`

Selisih norma itu adalah "makna yang dikorbankan":

\`\`\`math
\Delta = \|\mathbf{x}\|_2 - \|P_W \mathbf{x}\|_2 \ge 0
\`\`\`

Jarak yang memperjelas jurang dapat diibaratkan sebagai fungsi jarak yang diperbesar oleh faktor $k > 1$:

\`\`\`math
d_k(\mathbf{x}, \mathbf{y}) = k \cdot \|\mathbf{x} - \mathbf{y}\|_2
\`\`\`

Namun jarak juga memberi keutuhan pandangan; dari jauh, derau lokal mengecil dan struktur global terlihat:

\`\`\`math
\lim_{d \to \infty} \frac{1}{d^2} \sum_{i=1}^{N} \|\mathbf{x}_i - \mathbf{y}_i\|_2^2
\`\`\`

Dengan kata lain, bahasa adalah operator proyeksi yang jujur: ia tidak menjembatani, ia hanya menunjukkan seberapa besar selisih yang tersisa.`,
    createdAt: '2025-03-22T13:25:00.000Z',
  },
  {
    title: 'Hujan yang kita hafal',
    body: `Rumah adalah hujan yang kita hafal di luar kepala. Bukan atapnya, bukan dindingnya, bukan alamatnya — melainkan suara hujan yang jatuh di atasnya, yang bisa kita kenali bahkan ketika kita sedang berada jauh dari sana. Setiap rumah memiliki irama hujan sendiri: ada yang deras dan marah, ada yang pelan dan sabar, ada yang datang tiba-tiba lalu pergi tanpa pamit.

Menghafal hujan berarti menghafal sesuatu yang tidak pernah sama. Hujan berikutnya selalu berbeda dari hujan sebelumnya, tetapi bagi telinga yang sudah terbiasa, perbedaannya justru menjadi tanda pengenal. Kita mengenali rumah bukan dari yang tetap, melainkan dari yang berubah dengan cara yang sama. Di sinilah keanehan ingatan: ia mengikat kita pada sesuatu bukan karena kesamaannya, melainkan karena pola perubahannya.

Orang-orang yang merantau sering mengatakan bahwa mereka merindukan rumah setiap kali hujan turun. Yang mereka rindukan bukan rumah itu sendiri, melainkan kemampuan untuk mengenali hujan tanpa perlu berpikir. Di tempat baru, hujan selalu terasa asing; ia tidak memberi tahu apa pun tentang siapa kita. Dan mungkin itulah definisi paling sederhana dari kehilangan: ketika hujan tidak lagi berbicara dalam bahasa yang kita hafal.

Intensitas hujan dapat dimodelkan sebagai fungsi waktu:

\`\`\`math
I(t) \ge 0
\`\`\`

"Irama hujan" adalah pola perubahan intensitas, bukan nilai absolutnya. Karena itu, dua hujan berbeda dapat memiliki irama yang sama jika bentuk fungsinya sama:

\`\`\`math
I_1(t) = a_1 g(t), \quad I_2(t) = a_2 g(t), \quad a_1 \neq a_2
\`\`\`

Keduanya berbeda amplitudo tetapi sama pola. Pengenalan rumah dari irama hujan adalah pengenalan terhadap bentuk $g$, bukan terhadap skala $a$:

\`\`\`math
g(t) = \sum_{k=1}^{K} A_k \sin(2\pi f_k t + \varphi_k)
\`\`\`

Jika ingatan menyimpan pola perubahan, maka "jarak" antara hujan rumah dan hujan di perantauan dapat diukur dengan korelasi bentuk:

\`\`\`math
\rho(I_{\text{rumah}}, I_{\text{asing}}) = \frac{\langle I_{\text{rumah}}, I_{\text{asing}} \rangle}{\|I_{\text{rumah}}\| \, \|I_{\text{asing}}\|}
\`\`\`

Rumah terasa dikenal bila:

\`\`\`math
\rho \approx 1
\`\`\`

Kehilangan, dalam bahasa ini, adalah ketika korelasi bentuk jatuh mendekati nol:

\`\`\`math
\rho \to 0
\`\`\`

sehingga hujan tidak lagi "berbicara dalam bahasa yang kita hafal".`,
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

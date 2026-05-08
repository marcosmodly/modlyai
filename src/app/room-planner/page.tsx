'use client';

import { ArrowRight, Camera, Check, Sparkles, Upload } from 'lucide-react';
import { useState } from 'react';

type AnalysisStatus = 'idle' | 'analyzing' | 'done';

export default function RoomPlannerPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [roomType, setRoomType] = useState('Living Room');
  const [lengthFt, setLengthFt] = useState('');
  const [widthFt, setWidthFt] = useState('');
  const [ceilingHeightFt, setCeilingHeightFt] = useState('');
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const canAnalyze = Boolean(file) && status !== 'analyzing';

  function setSelectedFile(selected: File | null) {
    setShareMessage(null);
    setFile(selected);
    setStatus('idle');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (!selected) {
      setPreviewUrl(null);
      return;
    }
    setPreviewUrl(URL.createObjectURL(selected));
  }

  function onFileInputChange(e: { target: { files?: FileList | null } }) {
    const selected = e.target.files?.[0] ?? null;
    setSelectedFile(selected);
  }

  function onDrop(e: {
    preventDefault: () => void;
    dataTransfer: { files?: FileList | null };
  }) {
    e.preventDefault();
    setDragActive(false);
    const selected = e.dataTransfer.files?.[0] ?? null;
    if (selected) setSelectedFile(selected);
  }

  async function onAnalyze() {
    if (!file) return;
    setShareMessage(null);
    setStatus('analyzing');
    await new Promise((resolve) => setTimeout(resolve, 1300));
    setStatus('done');
  }

  function buildShareText() {
    const dims =
      lengthFt && widthFt && ceilingHeightFt
        ? `${lengthFt}ft L x ${widthFt}ft W x ${ceilingHeightFt}ft H`
        : 'Room dimensions pending';
    return `Room Planner results\nRoom: ${roomType}\nDimensions: ${dims}`;
  }

  async function onShare() {
    const text = buildShareText();
    try {
      if (navigator?.share) {
        await navigator.share({ title: 'Room Planner', text });
        setShareMessage('Shared successfully.');
        return;
      }
    } catch {
      // fall back to clipboard
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareMessage('Copied share summary to clipboard.');
    } catch {
      setShareMessage('Could not share automatically. Please copy the details manually.');
    }
  }

  function onExportPdf() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
      <style jsx global>{`
        @media print {
          header,
          nav,
          footer,
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Room Analysis</span>
            </div>

            <h1 className="text-5xl font-bold mb-4">Room Planner</h1>

            <p className="text-xl text-blue-100 mb-8">
              Upload a photo of your room and get catalog-based furniture and customization
              suggestions based on your space and style.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-green-300" />
                <span>Room photo upload</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-green-300" />
                <span>Catalog-based product suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-green-300" />
                <span>Style-aware recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-green-300" />
                <span>Placement guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-xl md:p-6">
            {status === 'done' && (
              <div className="mb-4 flex justify-end">
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Suggested analysis
                </div>
              </div>
            )}

            <input
              id="room-photo"
              type="file"
              accept="image/*"
              onChange={onFileInputChange}
              className="hidden"
            />

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">Upload Room Photos</h2>
                  {file && (
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => document.getElementById('room-photo')?.click()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') document.getElementById('room-photo')?.click();
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={onDrop}
                  className={[
                    'w-full aspect-video rounded-xl border-2 border-dashed transition-colors cursor-pointer outline-none',
                    'flex items-center justify-center bg-gray-50 px-6 text-center',
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50/50',
                    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  ].join(' ')}
                >
                  <div className="flex max-w-sm flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {file ? file.name : 'Drop your room photo here'}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Click to browse or drag and drop a JPG or PNG.</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('room-photo')?.click();
                      }}
                      className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">Room Preview</h2>
                  <span className="text-sm text-gray-500">
                    {previewUrl ? 'Photo loaded' : 'Awaiting upload'}
                  </span>
                </div>
                <div className="w-full aspect-video rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="Uploaded room preview"
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  ) : (
                    <div className="px-6 text-center text-gray-400">
                      <Camera className="mx-auto mb-2 h-12 w-12" />
                      <p className="text-sm font-medium">Your room photo will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-900">Room Dimensions</h3>
              <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Room Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Dining Room</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">
                    Select the room type that best matches the uploaded photo.
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Length</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="15"
                    value={lengthFt}
                    onChange={(e) => setLengthFt(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Width</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="12"
                    value={widthFt}
                    onChange={(e) => setWidthFt(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Ceiling Height</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="8"
                    value={ceilingHeightFt}
                    onChange={(e) => setCeilingHeightFt(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 no-print">
              <button
                type="button"
                onClick={onAnalyze}
                disabled={!canAnalyze}
                className={[
                  'flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  canAnalyze
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500 shadow-none',
                ].join(' ')}
              >
                {status === 'analyzing' ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Room
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onExportPdf}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Export PDF
              </button>
              <button
                type="button"
                onClick={onShare}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Share
              </button>
            </div>

            {shareMessage && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                {shareMessage}
              </div>
            )}

            <div className="print-only hidden mt-6">
              <div className="rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900">Room Planner</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Room: {roomType} · Length: {lengthFt || '-'}ft · Width: {widthFt || '-'}ft · Ceiling Height:{' '}
                  {ceilingHeightFt || '-'}ft
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

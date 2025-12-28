
"use client";

import { useState, useMemo, type ChangeEvent, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-language";
import { UploadCloud, FileText, FileSignature, ArrowRight, Download, X, FileImage, FileSpreadsheet, Presentation, FileCode } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type ConversionType = 
  | "pdf-to-word" | "word-to-pdf" 
  | "pdf-to-jpg" | "jpg-to-pdf" 
  | "pdf-to-excel" | "excel-to-pdf"
  | "pdf-to-ppt" | "ppt-to-pdf"
  | "html-to-pdf"
  | "merge-pdf" | "split-pdf"
  | "extract-pages" | "delete-pages"
  | "reorder-pages" | "rotate-pages"
  | "watermark-text" | "add-page-numbers"
  | "protect-pdf" | "unlock-pdf"
  | "repair-pdf" | "pdf-to-pdfa"
  | "ocr-pdf" | "edit-pdf";

type ConversionStatus = "idle" | "file-selected" | "uploading" | "converting" | "done" | "error";

interface FileConverterProps {
  conversionType: ConversionType;
  setConversionType: (type: ConversionType) => void;
}

const getConversionInfo = (conversionType: ConversionType) => {
    const baseInfo = {
        accept: 'application/pdf',
        multiple: false,
        params: [] as ({ id: string; label: string; type: string; options?: string[] } | { id: string; label: string; type: 'select'; options: string[] })[],
    };
    switch (conversionType) {
        case "pdf-to-word": return { ...baseInfo, title: "PDF to Word", actionText: "Convert to Word", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <FileSignature className="h-10 w-10 text-primary" />, fromType: "PDF", toType: "Word", accept: "application/pdf" };
        case "word-to-pdf": return { ...baseInfo, title: "Word to PDF", actionText: "Convert to PDF", fromIcon: <FileSignature className="h-10 w-10 text-primary" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "Word", toType: "PDF", accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
        case "pdf-to-jpg": return { ...baseInfo, title: "PDF to JPG", actionText: "Convert to JPG", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <FileImage className="h-10 w-10 text-yellow-500" />, fromType: "PDF", toType: "JPG" };
        case "jpg-to-pdf": return { ...baseInfo, title: "JPG to PDF", actionText: "Convert to PDF", fromIcon: <FileImage className="h-10 w-10 text-yellow-500" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "JPG", toType: "PDF", accept: "image/jpeg", multiple: true };
        case "pdf-to-excel": return { ...baseInfo, title: "PDF to Excel", actionText: "Convert to Excel", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <FileSpreadsheet className="h-10 w-10 text-green-600" />, fromType: "PDF", toType: "Excel" };
        case "excel-to-pdf": return { ...baseInfo, title: "Excel to PDF", actionText: "Convert to PDF", fromIcon: <FileSpreadsheet className="h-10 w-10 text-green-600" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "Excel", toType: "PDF", accept: ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
        case "pdf-to-ppt": return { ...baseInfo, title: "PDF to PowerPoint", actionText: "Convert to PPT", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <Presentation className="h-10 w-10 text-orange-500" />, fromType: "PDF", toType: "PPT" };
        case "ppt-to-pdf": return { ...baseInfo, title: "PowerPoint to PDF", actionText: "Convert to PDF", fromIcon: <Presentation className="h-10 w-10 text-orange-500" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "PPT", toType: "PDF", accept: ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" };
        case "html-to-pdf": return { ...baseInfo, title: "HTML to PDF", actionText: "Convert to PDF", fromIcon: <FileCode className="h-10 w-10 text-blue-500" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "HTML", toType: "PDF", accept: "text/html" };
        case "merge-pdf": return { ...baseInfo, title: "Merge PDF", actionText: "Merge PDFs", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <FileText className="h-10 w-10 text-destructive" />, fromType: "PDFs", toType: "PDF", multiple: true };
        case "split-pdf": return { ...baseInfo, title: "Split PDF", actionText: "Split PDF", fromType: "PDF", toType: "PDFs", params: [{ id: 'ranges', label: 'Page ranges (e.g., 1-3, 5, 7-9)', type: 'text' }] };
        case "extract-pages": return { ...baseInfo, title: "Extract Pages", actionText: "Extract Pages", fromType: "PDF", toType: "PDF", params: [{ id: 'pages', label: 'Pages to extract (e.g., 1, 3, 5-7)', type: 'text' }] };
        case "delete-pages": return { ...baseInfo, title: "Delete Pages", actionText: "Delete Pages", fromType: "PDF", toType: "PDF", params: [{ id: 'pages_to_delete', label: 'Pages to delete (e.g., 2, 4)', type: 'text' }] };
        case "reorder-pages": return { ...baseInfo, title: "Reorder Pages", actionText: "Reorder Pages", fromType: "PDF", toType: "PDF", params: [{ id: 'new_order', label: 'New page order (e.g., 3,1,2,4)', type: 'text' }] };
        case "rotate-pages": return { ...baseInfo, title: "Rotate Pages", actionText: "Rotate Pages", fromType: "PDF", toType: "PDF", params: [{ id: 'rotation_angle', label: 'Rotation Angle (90, 180, 270)', type: 'number' }, { id: 'pages', label: 'Pages to rotate (e.g., 1, 3, all)', type: 'text' }] };
        case "watermark-text": return { ...baseInfo, title: "Add Text Watermark", actionText: "Add Watermark", fromType: "PDF", toType: "PDF", params: [{ id: 'text', label: 'Watermark Text', type: 'text' }] };
        case "add-page-numbers": return { ...baseInfo, title: "Add Page Numbers", actionText: "Add Numbers", fromType: "PDF", toType: "PDF", params: [{ id: 'position', label: 'Position', type: 'select', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] }, {id: 'margin', label: 'Margin', type: 'number'}, { id: 'pages', label: 'Pages to number (e.g., 1-5, all)', type: 'text' }] };
        case "protect-pdf": return { ...baseInfo, title: "Protect PDF", actionText: "Protect PDF", fromType: "PDF", toType: "PDF", params: [{ id: 'password', label: 'Password', type: 'password' }] };
        case "unlock-pdf": return { ...baseInfo, title: "Unlock PDF", actionText: "Unlock PDF", fromType: "PDF", toType: "PDF", params: [{ id: 'password', label: 'Password', type: 'password' }] };
        case "repair-pdf": return { ...baseInfo, title: "Repair PDF", actionText: "Repair PDF", fromType: "PDF", toType: "PDF" };
        case "pdf-to-pdfa": return { ...baseInfo, title: "Convert to PDF/A", actionText: "Convert", fromType: "PDF", toType: "PDF/A" };
        case "ocr-pdf": return { ...baseInfo, title: "OCR PDF", actionText: "Perform OCR", fromType: "PDF", toType: "PDF" };
        case "edit-pdf": return { ...baseInfo, title: "Edit PDF", actionText: "Add Text to PDF", fromType: "PDF", toType: "PDF", params: [{ id: 'text', label: 'Text to add', type: 'text' }, { id: 'page', label: 'Page number', type: 'number' }, {id: 'x', label: 'X coordinate', type: 'number'}, {id: 'y', label: 'Y coordinate', type: 'number'}, {id: 'fontsize', label: 'Font size', type: 'number'}] };
        default: return { ...baseInfo, title: "PDF to Word", actionText: "Convert to Word", fromIcon: <FileText className="h-10 w-10 text-destructive" />, toIcon: <FileSignature className="h-10 w-10 text-primary" />, fromType: "PDF", toType: "Word" };
    }
};

function FileDropZone({
  conversionType,
  conversionInfo,
  status,
  files,
  additionalParams,
  progress,
  convertedFile,
  handleFileChange,
  handleParamChange,
  handleConvert,
  handleDownload,
  resetState,
  setFiles,
  htmlContent,
  setHtmlContent,
}: {
  conversionType: ConversionType;
  conversionInfo: ReturnType<typeof getConversionInfo>;
  status: ConversionStatus;
  files: File[];
  additionalParams: Record<string, string>;
  progress: number;
  convertedFile: { blob: Blob; name: string } | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleParamChange: (id: string, value: string) => void;
  handleConvert: () => void;
  handleDownload: () => void;
  resetState: () => void;
  setFiles: (files: File[]) => void;
  htmlContent: string;
  setHtmlContent: (content: string) => void;
}) {
  const { fromIcon, toIcon, fromType, actionText, accept, multiple, params } = conversionInfo;
  
  const handleLocalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setHtmlContent(""); // Clear text content if a file is selected
    }
    handleFileChange(e);
  };

  const handleLocalHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content) {
      setFiles([]); // Clear file if text is entered
    }
    setHtmlContent(content);
  }

  const renderHtmlToPdfInputs = () => (
    <div className="space-y-6">
      <div className="flex justify-center items-center gap-6">
        {fromIcon}
        <ArrowRight className="h-8 w-8 text-muted-foreground" />
        {toIcon}
      </div>
      
      <FileDropZoneCore 
        fromType={fromType} 
        accept={accept} 
        multiple={false} 
        handleFileChange={handleLocalFileChange} 
        files={files}
        status={status}
        disabled={!!htmlContent}
      />
       {files.length > 0 && (
        <FilePreview files={files} fromIcon={fromIcon} onRemove={resetState} isSingle={true} />
       )}
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or Paste Code</span>
        </div>
      </div>

      <Textarea
        placeholder="Paste your HTML code here"
        className="h-48"
        value={htmlContent}
        onChange={handleLocalHtmlChange}
        disabled={files.length > 0}
      />
    </div>
  );

  const renderDefaultInputs = () => (
     <div className="space-y-6">
      <div className="flex justify-center items-center gap-6">
        {fromIcon}
        <ArrowRight className="h-8 w-8 text-muted-foreground" />
        {toIcon}
      </div>

      {(status === "idle" || status === "file-selected") && (
          <FileDropZoneCore 
            fromType={fromType} 
            accept={accept} 
            multiple={multiple} 
            handleFileChange={handleFileChange}
            files={files}
            status={status}
            disabled={false}
          />
      )}

      {files.length > 0 && (status === "file-selected" || status === "converting" || status === "done" || status === 'error') && (
         <FilePreview files={files} fromIcon={fromIcon} onRemove={(index) => {
            if (multiple) {
                setFiles(files.filter((_, i) => i !== index));
            } else {
                resetState();
            }
         }} isSingle={!multiple} />
      )}
     </div>
  );

  return (
    <div className="space-y-6">
       {conversionType === 'html-to-pdf' ? renderHtmlToPdfInputs() : renderDefaultInputs()}

      {status === "file-selected" && params && params.length > 0 && (
          <div className="grid gap-4">
              {params.map(param => (
                  <div key={param.id} className="grid gap-2">
                      <Label htmlFor={param.id}>{param.label}</Label>
                      {param.type === 'select' ? (
                        <Select onValueChange={(value) => handleParamChange(param.id, value)} defaultValue={additionalParams[param.id]}>
                          <SelectTrigger id={param.id}>
                            <SelectValue placeholder={param.label} />
                          </SelectTrigger>
                          <SelectContent>
                            {param.options?.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          id={param.id} 
                          type={param.type}
                          placeholder={param.label}
                          value={additionalParams[param.id] || ''}
                          onChange={(e) => handleParamChange(param.id, e.target.value)}
                        />
                      )}
                  </div>
              ))}
          </div>
      )}

      {status === 'converting' && (
        <div className="space-y-2 text-center">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground animate-pulse">Converting... {progress}%</p>
        </div>
      )}
      
      {(status === "file-selected") && (
        <Button onClick={handleConvert} className="w-full" size="lg" disabled={status === 'converting' || (files.length === 0 && !htmlContent)}>
          {actionText}
        </Button>
      )}

      {status === "done" && (
        <div className="grid gap-4 sm:grid-cols-2">
           <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download File
          </Button>
          <Button onClick={resetState} className="w-full" size="lg" variant="outline">
            Convert Another
          </Button>
        </div>
      )}
    </div>
  );
}

function FileDropZoneCore({ fromType, accept, multiple, handleFileChange, files, status, disabled }: {
  fromType: string;
  accept: string;
  multiple: boolean;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  status: ConversionStatus;
  disabled: boolean;
}) {
  if (status !== 'idle' && status !== 'file-selected') return null;
  if (files.length > 0 && !multiple) return null;

  const baseClasses = "relative border-2 border-dashed border-border rounded-lg p-10 text-center transition-colors group";
  const enabledClasses = "hover:border-primary";
  const disabledClasses = "bg-secondary/50 cursor-not-allowed opacity-50";

  return (
    <div className={cn(baseClasses, disabled ? disabledClasses : enabledClasses)}>
      <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
      <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-4 font-semibold text-foreground">
        Drop your {fromType} file{multiple ? 's' : ''} here
      </p>
      <p className="text-sm text-muted-foreground">or click to browse</p>
      <Input
        id="file-upload"
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        aria-label={`Upload ${fromType} file`}
        disabled={disabled}
      />
    </div>
  );
}

function FilePreview({ files, fromIcon, onRemove, isSingle }: {
  files: File[];
  fromIcon: React.ReactNode;
  onRemove: (index: number) => void;
  isSingle: boolean;
}) {
  return (
     <div className="border rounded-lg p-4 space-y-2 bg-secondary/50 relative">
        {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                    {fromIcon}
                    <span className="font-medium text-sm truncate">{file.name}</span>
                </div>
                {!isSingle ? (
                 <Button variant="ghost" size="icon" onClick={() => onRemove(index)} aria-label="Remove file">
                  <X className="h-4 w-4" />
                </Button>
               ) : null}
            </div>
        ))}
        {isSingle && files.length > 0 && (
             <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => onRemove(0)} aria-label="Remove file">
              <X className="h-4 w-4" />
            </Button>
        )}
        {!isSingle && files.length > 1 && (
             <Button variant="ghost" size="sm" onClick={() => files.forEach((_, i) => onRemove(i))} className="w-full">
                Remove All
            </Button>
        )}
      </div>
  )
}

export function FileConverter({ conversionType, setConversionType }: FileConverterProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<{ blob: Blob, name: string } | null>(null);
  const [additionalParams, setAdditionalParams] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const conversionInfo = useMemo(() => getConversionInfo(conversionType), [conversionType]);

  const onTabChange = (value: string) => {
    setConversionType(value as ConversionType);
  };
  
  useEffect(() => {
    resetState();
  }, [conversionType]);
  
  useEffect(() => {
    if (files.length > 0 || htmlContent) {
        setStatus('file-selected');
    } else {
        setStatus('idle');
    }
  }, [files, htmlContent]);

  const resetState = () => {
    setFiles([]);
    setHtmlContent("");
    setStatus("idle");
    setProgress(0);
    setConvertedFile(null);
    const newParams: Record<string, string> = {};
    getConversionInfo(conversionType).params.forEach(param => {
      if (param.id === 'position') newParams[param.id] = 'bottom-center';
      if (param.id === 'margin') newParams[param.id] = '10';
      if (param.id === 'pages') newParams[param.id] = 'all';
      if (param.id === 'page') newParams[param.id] = '1';
      if (param.id === 'x') newParams[param.id] = '100';
      if (param.id === 'y') newParams[param.id] = '100';
      if (param.id === 'text') newParams[param.id] = 'Your Text Here';
      if (param.id === 'fontsize') newParams[param.id] = '12';
    });
    setAdditionalParams(newParams);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };
  
  const handleHtmlContentChange = (content: string) => {
    setHtmlContent(content);
  }

  const handleParamChange = (id: string, value: string) => {
    setAdditionalParams(prev => ({...prev, [id]: value}));
  };

  const handleConvert = async () => {
    if (files.length === 0 && !htmlContent) return;

    setStatus("converting");
    setProgress(0);

    const animateProgress = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      return interval;
    };
    const progressInterval = animateProgress();

    try {
      const formData = new FormData();
      formData.append("conversionType", conversionType);

      if (conversionType === 'html-to-pdf') {
        if (files.length > 0) {
          formData.append("file", files[0]);
        } else if (htmlContent) {
          formData.append("html", htmlContent);
        }
      } else {
        files.forEach((file) => {
            formData.append("files", file);
        });
      }

      for (const key in additionalParams) {
        formData.append(key, additionalParams[key]);
      }
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      
      if (!response.ok) {
        let errorMessage = `Conversion failed with status ${response.status}`;
        try {
            const errorBody = await response.text();
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                const errorJson = JSON.parse(errorBody);
                 if (errorJson.message) {
                    errorMessage = errorJson.message;
                 } else if (errorJson.detail) {
                    if (typeof errorJson.detail === 'string') {
                        errorMessage = errorJson.detail;
                    } else if (Array.isArray(errorJson.detail) && errorJson.detail[0]?.msg) {
                        errorMessage = errorJson.detail.map((d: any) => `${d.loc.join(' -> ')}: ${d.msg}`).join(', ');
                    } else {
                        errorMessage = JSON.stringify(errorJson.detail);
                    }
                 }
            } else if (errorBody && !errorBody.trim().startsWith('<')) {
                errorMessage = errorBody;
            }
        } catch (e) {
            // Parsing failed, do nothing and keep the default message
        }
        
        throw new Error(errorMessage);
      }
      
      setProgress(100);

      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition');
      let filename = "converted-file";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch && filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }
      
      setConvertedFile({ blob, name: filename });
      setStatus("done");
      toast({
        title: "Conversion Successful!",
        description: "Your file is ready for download.",
      });

    } catch (error) {
      clearInterval(progressInterval);
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error(error);
      toast({
        title: "Conversion Error",
        description: errorMessage,
        variant: "destructive",
      });
      setTimeout(() => {
         if (files.length > 0 || htmlContent) {
            setStatus("file-selected");
        } else {
            resetState();
        }
      }, 3000);
    }
  };

  const handleDownload = () => {
    if (!convertedFile) return;
    
    const url = URL.createObjectURL(convertedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Downloading ${convertedFile.name}.`,
    });
  };
  
  const isTabbedTool = conversionType === 'pdf-to-word' || conversionType === 'word-to-pdf';

  const MainContent = (
     <div className="pt-6">
       <FileDropZone
        key={conversionType}
        conversionType={conversionType}
        conversionInfo={conversionInfo}
        status={status}
        files={files}
        additionalParams={additionalParams}
        progress={progress}
        convertedFile={convertedFile}
        handleFileChange={handleFileChange}
        handleParamChange={handleParamChange}
        handleConvert={handleConvert}
        handleDownload={handleDownload}
        resetState={resetState}
        setFiles={setFiles}
        htmlContent={htmlContent}
        setHtmlContent={handleHtmlContentChange}
      />
    </div>
  );

  return (
    <Card className="w-full max-w-2xl shadow-xl border-t-4 border-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">{conversionInfo.title}</CardTitle>
        <CardDescription>The simplest way to convert your documents.</CardDescription>
      </CardHeader>
      <CardContent>
        {isTabbedTool ? (
          <Tabs value={conversionType} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pdf-to-word">PDF to Word</TabsTrigger>
              <TabsTrigger value="word-to-pdf">Word to PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="pdf-to-word" className="pt-6">
              {conversionType === 'pdf-to-word' && MainContent}
            </TabsContent>
            <TabsContent value="word-to-pdf" className="pt-6">
              {conversionType === 'word-to-pdf' && MainContent}
            </TabsContent>
          </Tabs>
        ) : (
          MainContent
        )}
      </CardContent>
    </Card>
  );
}


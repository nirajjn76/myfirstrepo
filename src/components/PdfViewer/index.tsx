import React, { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../DesignSystem/button';

interface PdfViewerProps {
  open: boolean;
  onClose: (agreed?: boolean, aggrementType?: string) => void;
  url: string;
  aggrementType?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  open, onClose, url, aggrementType,
}) => {
  const headers = new Headers();
  headers.append('Access-Control-Request-Method', 'GET');
  headers.append('Access-Control-Allow-Origin', 'http://34.206.139.148:8081/');

  const [numPages, setNumPages] = useState<number>();

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => onClose()}
      classes={{
        root: 'dialog-root',
        paper: 'dialog-paper',
      }}
    >
      <DialogTitle
        classes={{
          root: 'dialog-title agreement_header',
        }}
      >
        <div>
          <label>Agreement</label>
          <CloseIcon onClick={() => onClose()} />
        </div>
      </DialogTitle>
      <DialogContent
        classes={{
          root: 'dialog-content-pdf',
        }}
      >
        <Document
          file={
            {
              url,
              httpHeaders: {
                ...headers,
              },
              withCredentials: true,
            }
          }
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
          loading={undefined}
        >

          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => <Page key={page} pageNumber={page} />)}
        </Document>
      </DialogContent>
      <DialogActions
        classes={{
          root: 'dialog-actions',
        }}
      >
        <div className="buttons">
          {/* {
            <div></div>
          } */}
        </div>

        <div className="agree-content">
          <span>I read all the above terms & conditions</span>
          <Button onClick={() => onClose(true, aggrementType)} variant="primary" text="I Agree" className="btn-agree" />
        </div>

      </DialogActions>

    </Dialog>
  );
};

export default PdfViewer;

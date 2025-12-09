import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Drawer from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSupabase } from "../components/SupabaseContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const DeportesPage = () => {
  const supabase = useSupabase();
  const [deportes, setDeportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDeporte, setCurrentDeporte] = useState(null);
  const [nombreDeporte, setNombreDeporte] = useState("");

  const fetchDeportes = async () => {
    try {
      const { data, error } = await supabase.from("deporte").select("*");
      if (error) throw error;
      setDeportes(data || []);
    } catch (error) {
      console.error("Error al obtener los deportes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDeporte = async () => {
    try {
      if (currentDeporte) {
        const { error } = await supabase
          .from("deporte")
          .update({ nombre: nombreDeporte })
          .eq("id", currentDeporte.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("deporte")
          .insert({ nombre: nombreDeporte });
        if (error) throw error;
      }
      setOpenDialog(false);
      fetchDeportes();
    } catch (error) {
      console.error("Error al guardar el deporte:", error);
    }
  };

  const handleDeleteDeporte = async (id) => {
    try {
      const { error } = await supabase.from("deporte").delete().eq("id", id);
      if (error) throw error;
      fetchDeportes();
    } catch (error) {
      console.error("Error al eliminar el deporte:", error);
    }
  };

  const openDialogHandler = (deporte = null) => {
    setCurrentDeporte(deporte);
    setNombreDeporte(deporte ? deporte.nombre : "");
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchDeportes();
  }, []);

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 2 }}>
        <StyledEngineProvider injectFirst>
          <Drawer />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Deportes
            </Typography>
            <IconButton
              color="primary"
              onClick={() => openDialogHandler()}
              aria-label="Agregar nuevo deporte"
            >
              <Add />
            </IconButton>
          </div>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Nombre</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Cargando deportes...
                    </TableCell>
                  </TableRow>
                ) : (
                  deportes.map((deporte) => (
                    <TableRow key={deporte.id}>
                      <TableCell>{deporte.nombre}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => openDialogHandler(deporte)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDeleteDeporte(deporte.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              {currentDeporte ? "Editar Deporte" : "Crear Nuevo Deporte"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Nombre del Deporte"
                fullWidth
                value={nombreDeporte}
                onChange={(e) => setNombreDeporte(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveDeporte}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </StyledEngineProvider>
      </Container>
    </React.Fragment>
  );
};

export default DeportesPage;

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

const TipoItemPage = () => {
  const supabase = useSupabase();
  const [tipoItems, setTipoItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTipoItem, setCurrentTipoItem] = useState(null);
  const [descripcionTipoItem, setDescripcionTipoItem] = useState("");

  const fetchTipoItem = async () => {
    try {
      const { data, error } = await supabase.from("tipo_item").select("*");
      if (error) throw error;
      setTipoItem(data || []);
    } catch (error) {
      console.error("Error al obtener los tipos de items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTipoItem = async () => {
    try {
      if (currentTipoItem) {
        const { error } = await supabase
          .from("tipo_item")
          .update({ descripcion: descripcionTipoItem })
          .eq("id", currentTipoItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tipo_item")
          .insert({ descripcion: descripcionTipoItem });
        if (error) throw error;
      }
      setOpenDialog(false);
      fetchTipoItem();
    } catch (error) {
      console.error("Error al guardar el tipo_item:", error);
    }
  };

  const handleDeleteTipoItem = async (id) => {
    try {
      const { error } = await supabase.from("tipo_item").delete().eq("id", id);
      if (error) throw error;
      fetchTipoItem();
    } catch (error) {
      console.error("Error al eliminar el tipo_item:", error);
    }
  };

  const openDialogHandler = (tipo_item = null) => {
    setCurrentTipoItem(tipo_item);
    setDescripcionTipoItem(tipo_item ? tipo_item.descripcion : "");
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchTipoItem();
  }, []);

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 2 }}>
        <StyledEngineProvider injectFirst>
          <Drawer />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Tipos de Items
            </Typography>
            <IconButton
              color="primary"
              onClick={() => openDialogHandler()}
              aria-label="Agregar nuevo tipo_item"
            >
              <Add />
            </IconButton>
          </div>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Descripcion</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Cargando tipos de items...
                    </TableCell>
                  </TableRow>
                ) : (
                  tipoItems.map((tipo_item) => (
                    <TableRow key={tipo_item.id}>
                      <TableCell>{tipo_item.descripcion}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => openDialogHandler(tipo_item)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDeleteTipoItem(tipo_item.id)}
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
              {currentTipoItem ? "Editar Tipo de item" : "Crear Nuevo Tipo de item"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Descripcion del Tipo de item"
                fullWidth
                value={descripcionTipoItem}
                onChange={(e) => setDescripcionTipoItem(e.target.value)}
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
                onClick={handleSaveTipoItem}
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

export default TipoItemPage;
